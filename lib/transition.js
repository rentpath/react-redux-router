'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _littleRouter = require('little-router');

var _actions = require('./actions');

var _utils = require('./utils');

var _const = require('./const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var strict, _options$routes, routes, _options$location, location, dispatch, beforeRender, route, params, actions, resolvers, components, promises, sanitized, branches, result;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            strict = options.strict, _options$routes = options.routes, routes = _options$routes === undefined ? [] : _options$routes, _options$location = options.location, location = _options$location === undefined ? {} : _options$location, dispatch = options.dispatch, beforeRender = options.beforeRender;
            route = {};
            params = {};
            actions = [];
            resolvers = {};
            components = {};
            promises = void 0;
            sanitized = void 0;

            // match route branches

            branches = (0, _littleRouter.matchRoutes)({
              path: location.pathname || '',
              routes: routes,
              strict: strict
            });

            // reduce route object while extracting
            // actions, resolvers, and components

            branches.forEach(function (branch, index) {
              var _branch$route = branch.route,
                  action = _branch$route.action,
                  resolve = _branch$route.resolve,
                  component = _branch$route.component,
                  rest = (0, _objectWithoutProperties3.default)(_branch$route, ['action', 'resolve', 'component']);


              (0, _assign2.default)(route, rest);
              (0, _assign2.default)(params, branch.params);

              if (action) {
                actions.push(action);
              }
              if (resolve) {
                resolvers[index] = resolve;
              }
              if (component) {
                components[index] = component;
              }
            });

            // ensure route has a status
            if (!route.status) {
              route.status = branches.length ? _const.STATUS_OK : _const.STATUS_NOT_FOUND;
            }

            // clean data for dispatch
            sanitized = (0, _utils.sanitize)(route);
            delete sanitized.routes;

            // dispatch route change action
            if (dispatch) {
              dispatch((0, _actions.changeRoute)({
                route: sanitized,
                params: params,
                location: location
              }));
            }

            // resolve routes with async properties
            promises = [];
            (0, _keys2.default)(resolvers).forEach(function (index) {
              var resolver = resolvers[index];
              var response = _promise2.default.resolve(resolver({ route: route, params: params, location: location }));
              promises.push(response.then(function () {
                var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var component = _ref2.component,
                    props = (0, _objectWithoutProperties3.default)(_ref2, ['component']);

                (0, _assign2.default)(route, props);
                if (component) {
                  components[index] = component;
                }
              }));
            });

            if (!promises.length) {
              _context.next = 19;
              break;
            }

            _context.next = 19;
            return _promise2.default.all(promises);

          case 19:
            if (!dispatch) {
              _context.next = 25;
              break;
            }

            promises = [];
            actions.forEach(function (action) {
              if ((0, _utils.isFunc)(action)) {
                var resp = dispatch(action({ route: route, params: params, location: location }));
                if ((0, _utils.isPromise)(resp)) {
                  promises.push(resp);
                }
              } else {
                dispatch(action);
              }
            });

            if (!promises.length) {
              _context.next = 25;
              break;
            }

            _context.next = 25;
            return _promise2.default.all(promises);

          case 25:

            // sort components into proper order and
            // add back to route object
            route.components = (0, _keys2.default)(components).sort().map(function (key) {
              return components[key];
            });

            // define a result object since
            // we need it twice below
            result = {
              route: route,
              routes: routes,
              strict: strict,
              params: params,
              location: location
            };

            // this callback is useful for ensuring
            // custom actions get dispatched in the
            // same render cycle that gets triggered by
            // the actions being triggered in this file

            if ((0, _utils.isFunc)(beforeRender)) {
              beforeRender(result);
            }

            // clean data for dispatch
            sanitized = (0, _utils.sanitize)(route);
            delete sanitized.routes;
            delete sanitized.components;

            // dispatch render route action
            if (dispatch) {
              dispatch((0, _actions.renderRoute)({
                route: sanitized,
                params: params,
                location: location
              }));
            }

            return _context.abrupt('return', result);

          case 33:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function () {
    return _ref.apply(this, arguments);
  };
}();