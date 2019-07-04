import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { CHANGE_ROUTE, RENDER_ROUTE, CHANGE_STATUS, CHANGE_LOADING, CHANGE_LOCATION } from './const';
export var initial = {
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

  var loc = _objectSpread({}, location, {
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

export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case CHANGE_LOCATION:
      return _objectSpread({}, state, {
        route: action.status ? _objectSpread({}, state.route, {
          status: action.status
        }) : state.route,
        location: reduceLocation(state.location, action)
      });

    case CHANGE_ROUTE:
      return _objectSpread({}, state, {
        route: _objectSpread({}, action.route),
        params: _objectSpread({}, action.params)
      });

    case RENDER_ROUTE:
      return _objectSpread({}, state, {
        route: _objectSpread({}, action.route)
      });

    case CHANGE_STATUS:
      return _objectSpread({}, state, {
        route: _objectSpread({}, state.route, {
          status: action.status
        })
      });

    case CHANGE_LOADING:
      return _objectSpread({}, state, {
        route: _objectSpread({}, state.route, {
          loading: action.loading
        })
      });

    default:
      return state;
  }
});