import _Object$assign from 'babel-runtime/core-js/object/assign';
import _extends from 'babel-runtime/helpers/extends';
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

  var loc = _extends({}, location, {
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


  return _Object$assign(loc, {
    href: [protocol ? protocol + '//' : '', protocol ? hostname : '', protocol && hostname && port ? ':' + port : '', pathname, search, hash].join('')
  });
};

export default (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial;
  var action = arguments[1];

  switch (action.type) {
    case CHANGE_LOCATION:
      return _extends({}, state, {
        route: action.status ? _extends({}, state.route, {
          status: action.status
        }) : state.route,
        location: reduceLocation(state.location, action)
      });

    case CHANGE_ROUTE:
      return _extends({}, state, {
        route: _extends({}, action.route),
        params: _extends({}, action.params)
      });

    case RENDER_ROUTE:
      return _extends({}, state, {
        route: _extends({}, action.route)
      });

    case CHANGE_STATUS:
      return _extends({}, state, {
        route: _extends({}, state.route, {
          status: action.status
        })
      });

    case CHANGE_LOADING:
      return _extends({}, state, {
        route: _extends({}, state.route, {
          loading: action.loading
        })
      });

    default:
      return state;
  }
});