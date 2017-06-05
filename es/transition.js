import _regeneratorRuntime from 'babel-runtime/regenerator';
import _Promise from 'babel-runtime/core-js/promise';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

import { matchRoutes } from 'little-router';
import { changeRoute, renderRoute } from './actions';
import { isFunc, isPromise, sanitize } from './utils';
import { STATUS_OK, STATUS_NOT_FOUND } from './const';

export default (function () {
  var _ref = _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var strict, _options$routes, routes, _options$location, location, dispatch, beforeRender, route, params, actions, resolvers, components, promise, promises, sanitized, branches, transition, result;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            strict = options.strict, _options$routes = options.routes, routes = _options$routes === undefined ? [] : _options$routes, _options$location = options.location, location = _options$location === undefined ? {} : _options$location, dispatch = options.dispatch, beforeRender = options.beforeRender;
            route = {};
            params = {};
            actions = [];
            resolvers = {};
            components = {};
            promise = void 0;
            promises = void 0;
            sanitized = void 0;

            // match route branches

            branches = matchRoutes({
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
                  rest = _objectWithoutProperties(_branch$route, ['action', 'resolve', 'component']);

              _Object$assign(route, rest);
              _Object$assign(params, branch.params);

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
            if (!route.status) {
              route.status = branches.length ? STATUS_OK : STATUS_NOT_FOUND;
            }

            // these are serializable but we don't want
            // them added to the state or passed down
            delete route.routes;

            // prepare route object for dispatch
            sanitized = sanitize(route);

            // create container for middleware updates
            transition = {};

            // dispatch route change action

            if (dispatch) {
              dispatch(changeRoute({
                route: sanitized,
                params: params,
                location: location,
                transition: transition
              }));
            }

            // resolve routes with async properties
            promises = [];
            _Object$keys(resolvers).forEach(function (index) {
              var resolver = resolvers[index];
              var response = _Promise.resolve(resolver({ route: route, params: params, location: location }));
              promises.push(response.then(function () {
                var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var action = _ref2.action,
                    component = _ref2.component,
                    props = _objectWithoutProperties(_ref2, ['action', 'component']);

                _Object$assign(route, props);
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
            return _Promise.all(promises);

          case 22:
            if (!dispatch) {
              _context.next = 28;
              break;
            }

            promises = [];
            actions.forEach(function (action) {
              if (isFunc(action)) {
                promise = dispatch(action({ route: route, params: params, location: location }));
                if (isPromise(promise)) {
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
            return _Promise.all(promises);

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
            route.components = _Object$keys(components).sort().map(function (key) {
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

            if (!isFunc(beforeRender)) {
              _context.next = 38;
              break;
            }

            promise = beforeRender(result);

            if (!isPromise(promise)) {
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
            sanitized = sanitize(route);

            // we don't want these in the state
            delete sanitized.components;

            // dispatch render route action
            if (dispatch) {
              dispatch(renderRoute({
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
    }, _callee, _this);
  }));

  return function () {
    return _ref.apply(this, arguments);
  };
})();