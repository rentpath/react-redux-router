'use strict';

exports.__esModule = true;

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

    var strict, _options$routes, routes, _options$location, location, dispatch, getState, store, beforeRender, status, route, params, actions, resolvers, components, promise, promises, sanitized, branches, transition, result;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            strict = options.strict, _options$routes = options.routes, routes = _options$routes === undefined ? [] : _options$routes, _options$location = options.location, location = _options$location === undefined ? {} : _options$location, dispatch = options.dispatch, getState = options.getState, store = options.store, beforeRender = options.beforeRender, status = options.status;
            route = {};
            params = {};
            actions = [];
            resolvers = {};
            components = {};
            promise = void 0;
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

            // toggle loading flag
            route.loading = true;

            // ensure route has a status code
            if (status) {
              route.status = status;
            } else if (!route.status) {
              route.status = branches.length ? _const.STATUS_OK : _const.STATUS_NOT_FOUND;
            }

            // these are serializable but we don't want
            // them added to the state or passed down
            delete route.routes;

            // prepare route object for dispatch
            sanitized = (0, _utils.sanitize)(route);

            // create container for middleware updates
            transition = {};

            // dispatch route change action

            if (dispatch) {
              dispatch((0, _actions.changeRoute)({
                route: sanitized,
                params: params,
                location: location,
                transition: transition
              }));
            }

            // resolve routes with async properties
            promises = [];
            (0, _keys2.default)(resolvers).forEach(function (index) {
              var resolver = resolvers[index];
              var response = _promise2.default.resolve(resolver({
                route: route,
                params: params,
                location: location,
                // This has to be done because we get getState on initial match
                // And store on subsequent client transitions
                // At some point we could switch it to use store fully
                getState: getState || store.getState
              }));
              promises.push(response.then(function () {
                var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var action = _ref2.action,
                    component = _ref2.component,
                    props = (0, _objectWithoutProperties3.default)(_ref2, ['action', 'component']);

                (0, _assign2.default)(route, props);
                if (action) {
                  actions.push(action);
                }
                if (component) {
                  components[index] = component;
                }
              }));
            });

            if (!promises.length) {
              _context.next = 22;
              break;
            }

            _context.next = 22;
            return _promise2.default.all(promises);

          case 22:
            if (!dispatch) {
              _context.next = 28;
              break;
            }

            promises = [];
            actions.forEach(function (action) {
              if ((0, _utils.isFunc)(action)) {
                promise = dispatch(action({ route: route, params: params, location: location }));
                if ((0, _utils.isPromise)(promise)) {
                  promises.push(promise);
                }
              } else {
                dispatch(action);
              }
            });

            if (!promises.length) {
              _context.next = 28;
              break;
            }

            _context.next = 28;
            return _promise2.default.all(promises);

          case 28:
            if (!transition.invalid) {
              _context.next = 30;
              break;
            }

            return _context.abrupt('return', undefined);

          case 30:

            // toggle loading flag
            route.loading = false;

            // sort components into proper order before
            // adding back to route
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
              location: location,
              getState: getState

              // this callback is useful for ensuring
              // custom actions get dispatched in the
              // same render cycle that gets triggered by
              // the actions being triggered in this file
            };

            if (!(0, _utils.isFunc)(beforeRender)) {
              _context.next = 38;
              break;
            }

            promise = beforeRender(result);

            if (!(0, _utils.isPromise)(promise)) {
              _context.next = 38;
              break;
            }

            _context.next = 38;
            return promise;

          case 38:
            if (!transition.invalid) {
              _context.next = 40;
              break;
            }

            return _context.abrupt('return', undefined);

          case 40:

            // update local route status code if a status change
            // was dispatched in route action or beforeRender
            if (transition.status) {
              route.status = transition.status;
            }

            // prepare route object for dispatch
            sanitized = (0, _utils.sanitize)(route);

            // we don't want these in the state
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

          case 45:
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