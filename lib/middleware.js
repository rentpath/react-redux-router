'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _methods;

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _actions = require('./actions');

var _const = require('./const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = (_methods = {}, (0, _defineProperty3.default)(_methods, _const.PUSH, 'push'), (0, _defineProperty3.default)(_methods, _const.REPLACE, 'replace'), (0, _defineProperty3.default)(_methods, _const.GO, 'go'), (0, _defineProperty3.default)(_methods, _const.GO_BACK, 'goBack'), (0, _defineProperty3.default)(_methods, _const.GO_FORWARD, 'goForward'), _methods);

var buildPath = function buildPath(location) {
  return '' + location.pathname + location.search + location.hash;
};

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (_ref) {
    var dispatch = _ref.dispatch;

    var resp = void 0;
    var router = void 0;
    var history = void 0;
    var transition = void 0;

    if (config.history) {
      history = config.history;
    } else if (config.history === undefined && typeof window !== 'undefined') {
      history = (0, _createBrowserHistory2.default)();
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

          case _const.GO:case _const.GO_BACK:case _const.GO_FORWARD:
            if (history) {
              history[methods[action.type]](action.index);
            }
            break;

          case _const.CHANGE_LOCATION:
            resp = next(action);

            if (transition) {
              transition.invalid = true;
            }
            if (history && methods[action.method]) {
              history[methods[action.method]](buildPath(action.location));
            }
            if (router) {
              router.transition(action.location);
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