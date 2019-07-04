import _defineProperty from "@babel/runtime/helpers/defineProperty";

var _methods;

import { createBrowserHistory } from 'history';
import { pop } from './actions';
import { POP, PUSH, REPLACE, GO, GO_BACK, GO_FORWARD, INIT_ROUTER, CHANGE_ROUTE, RENDER_ROUTE, CHANGE_STATUS, CHANGE_LOCATION } from './const';
var methods = (_methods = {}, _defineProperty(_methods, PUSH, 'push'), _defineProperty(_methods, REPLACE, 'replace'), _defineProperty(_methods, GO, 'go'), _defineProperty(_methods, GO_BACK, 'goBack'), _defineProperty(_methods, GO_FORWARD, 'goForward'), _methods);

var buildPath = function buildPath(location) {
  return "".concat(location.pathname).concat(location.search).concat(location.hash);
};

export default (function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (_ref) {
    var dispatch = _ref.dispatch;
    var resp;
    var router;
    var history;
    var transition;

    if (config.history) {
      history = config.history;
    } else if (config.history === undefined && typeof window !== 'undefined') {
      history = createBrowserHistory();
    }

    if (history) {
      history.listen(function (location, action) {
        if (action !== POP) return;
        dispatch(pop(location));
      });
    }

    return function (next) {
      return function (action) {
        switch (action.type) {
          case INIT_ROUTER:
            router = action.router;
            break;

          case GO:
          case GO_BACK:
          case GO_FORWARD:
            if (history) {
              history[methods[action.type]](action.index);
            }

            break;

          case CHANGE_LOCATION:
            resp = next(action);

            if (transition) {
              console.log('transition invalid', transition, action.location, action.status);
              transition.invalid = true;
            }

            if (history && methods[action.method]) {
              history[methods[action.method]](buildPath(action.location));
            }

            if (router) {
              router.transition(action.location, action.status);
            }

            return resp;

          case CHANGE_ROUTE:
            transition = action.transition;
            break;

          case CHANGE_STATUS:
            if (transition) {
              transition.status = action.status;
            }

            break;

          case RENDER_ROUTE:
            transition = null;
            break;
        }

        return next(action);
      };
    };
  };
});