"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _history = require("history");

var _actions = require("./actions");

var _const = require("./const");

var _methods;

var methods = (_methods = {}, (0, _defineProperty2.default)(_methods, _const.PUSH, 'push'), (0, _defineProperty2.default)(_methods, _const.REPLACE, 'replace'), (0, _defineProperty2.default)(_methods, _const.GO, 'go'), (0, _defineProperty2.default)(_methods, _const.GO_BACK, 'goBack'), (0, _defineProperty2.default)(_methods, _const.GO_FORWARD, 'goForward'), _methods);

var buildPath = function buildPath(location) {
  return "".concat(location.pathname).concat(location.search).concat(location.hash);
};

var _default = function _default() {
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
      history = (0, _history.createBrowserHistory)();
    }

    if (history) {
      history.listen(function (location, action) {
        if (action !== _const.POP) return;
        dispatch((0, _actions.pop)(location));
      });
    }

    return function (next) {
      return function (action) {
        switch (action.type) {
          case _const.INIT_ROUTER:
            router = action.router;
            break;

          case _const.GO:
          case _const.GO_BACK:
          case _const.GO_FORWARD:
            if (history) {
              history[methods[action.type]](action.index);
            }

            break;

          case _const.CHANGE_LOCATION:
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

          case _const.CHANGE_ROUTE:
            transition = action.transition;
            break;

          case _const.CHANGE_STATUS:
            if (transition) {
              transition.status = action.status;
            }

            break;

          case _const.RENDER_ROUTE:
            transition = null;
            break;
        }

        return next(action);
      };
    };
  };
};

exports.default = _default;