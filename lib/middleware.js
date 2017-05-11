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
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$history = _ref.history,
      history = _ref$history === undefined ? (0, _createBrowserHistory2.default)() : _ref$history;

  return function (_ref2) {
    var dispatch = _ref2.dispatch;

    var path = void 0;
    var resp = void 0;
    var router = void 0;

    history.listen(function (location, action) {
      if (action !== _const.POP) return;
      dispatch((0, _actions.pop)(location));
    });

    return function (next) {
      return function (action) {
        switch (action.type) {
          case _const.INIT_ROUTER:
            router = action.router;
            return next(action);

          case _const.GO:case _const.GO_BACK:case _const.GO_FORWARD:
            history[methods[action.type]](action.index);
            return next(action);

          case _const.CHANGE_LOCATION:
            resp = next(action);
            path = buildPath(action.location);

            if (methods[action.method]) {
              history[methods[action.method]](path);
            }
            if (router) {
              router.transition(action.location);
            }

            return resp;

          case _const.RENDER_ROUTE:
            return buildPath(action.location) === path ? next(action) : undefined;

          default:
            return next(action);
        }
      };
    };
  };
};