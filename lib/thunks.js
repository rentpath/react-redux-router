'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = exports.transition = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _littleRouter = require('little-router');

var _const = require('./const');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transition = exports.transition = function transition(_ref) {
  var routes = _ref.routes,
      location = _ref.location;
  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(dispatch) {
      var _ref3, route, params, index, rendered, render;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch((0, _actions.initRoute)({ location: location }));

              _context.next = 3;
              return (0, _littleRouter.match)({
                path: location.pathname,
                routes: routes
              });

            case 3:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 6;
                break;
              }

              _context.t0 = {};

            case 6:
              _ref3 = _context.t0;
              route = _ref3.route;
              params = _ref3.params;
              index = _ref3.index;

              if (route) {
                _context.next = 13;
                break;
              }

              dispatch((0, _actions.changeRoute)({
                route: { status: 404 },
                location: location
              }));
              return _context.abrupt('return');

            case 13:
              rendered = void 0;

              render = function render() {
                if (!rendered) {
                  dispatch((0, _actions.changeRoute)({ route: route, params: params, index: index, location: location }));
                  rendered = true;
                }
              };

              if (!route.action) {
                _context.next = 18;
                break;
              }

              _context.next = 18;
              return dispatch(route.action({ params: params, location: location, render: render }));

            case 18:

              if (!rendered) {
                render();
              }

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var initialize = exports.initialize = function initialize(_ref4) {
  var _ref4$routes = _ref4.routes,
      routes = _ref4$routes === undefined ? [] : _ref4$routes,
      location = _ref4.location;
  return function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(dispatch) {
      var action;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch((0, _actions.initRouter)({ routes: routes }));

              if (!location) {
                _context2.next = 5;
                break;
              }

              action = dispatch((0, _actions.changeLocation)({
                location: location,
                method: _const.PUSH,
                transition: false
              }));
              _context2.next = 5;
              return dispatch(transition({
                location: action.location,
                routes: routes
              }));

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref5.apply(this, arguments);
    };
  }();
};