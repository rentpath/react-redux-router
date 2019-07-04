import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { matchRoutes } from 'little-router';
import { changeRoute, renderRoute } from './actions';
import { isFunc, isPromise, sanitize } from './utils';
import { STATUS_OK, STATUS_NOT_FOUND } from './const';
import { getGlobalResolves } from './globalResolves';
export default (function () {
  var $args = arguments;
  return new Promise(function ($return, $error) {
    var options, strict, _options$routes, routes, _options$location, location, dispatch, getState, store, beforeRender, status, route, params, actions, resolvers, components, promise, promises, sanitized, branches, transition, runResolver, globalResolves, result;

    options = $args.length > 0 && $args[0] !== undefined ? $args[0] : {};
    strict = options.strict, _options$routes = options.routes, routes = _options$routes === void 0 ? [] : _options$routes, _options$location = options.location, location = _options$location === void 0 ? {} : _options$location, dispatch = options.dispatch, getState = options.getState, store = options.store, beforeRender = options.beforeRender, status = options.status;
    route = {};
    params = {};
    actions = [];
    resolvers = {};
    components = {};
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
          rest = _objectWithoutProperties(_branch$route, ["action", "resolve", "component"]);

      Object.assign(route, rest);
      Object.assign(params, branch.params);

      if (action) {
        actions.push(action);
      }

      if (resolve) {
        resolvers[index] = resolve;
      }

      if (component) {
        components[index] = component;
      }
    }); // toggle loading flag

    route.loading = true; // ensure route has a status code

    if (status) {
      route.status = status;
    } else if (!route.status) {
      route.status = branches.length ? STATUS_OK : STATUS_NOT_FOUND;
    } // these are serializable but we don't want
    // them added to the state or passed down


    delete route.routes; // prepare route object for dispatch

    sanitized = sanitize(route); // create container for middleware updates

    transition = {};

    // dispatch route change action
    if (dispatch) {
      dispatch(changeRoute({
        route: sanitized,
        params: params,
        location: location,
        transition: transition
      }));
    } // resolve routes with async properties


    promises = [];

    runResolver = function runResolver(resolver, index) {
      var response = Promise.resolve(resolver({
        route: route,
        params: params,
        location: location,
        // This has to be done because we get getState on initial match
        // And store on subsequent client transitions
        // At some point we could switch it to use store fully
        getState: getState || (store || {
          getState: function getState() {
            return {};
          }
        }).getState,
        dispatch: dispatch
      }));
      promises.push(response.then(function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var action = _ref.action,
            component = _ref.component,
            props = _objectWithoutProperties(_ref, ["action", "component"]);

        Object.assign(route, props);

        if (action) {
          actions.push(action);
        }

        if (component && index) {
          components[index] = component;
        }
      }));
    };

    globalResolves = getGlobalResolves();
    globalResolves.forEach(runResolver);
    Object.keys(resolvers).forEach(function (index) {
      var resolver = resolvers[index];
      runResolver(resolver, index);
    });

    if (promises.length) {
      return Promise.resolve(Promise.all(promises)).then(function ($await_6) {
        try {
          return $If_1.call(this);
        } catch ($boundEx) {
          return $error($boundEx);
        }
      }.bind(this), $error);
    } // dispatch route actions


    function $If_1() {
      if (dispatch) {
        promises = [];
        actions.forEach(function (action) {
          if (isFunc(action)) {
            promise = dispatch(action({
              route: route,
              params: params,
              location: location
            }));

            if (isPromise(promise)) {
              promises.push(promise);
            }
          } else {
            dispatch(action);
          }
        });

        if (promises.length) {
          return Promise.resolve(Promise.all(promises)).then(function ($await_7) {
            try {
              return $If_5.call(this);
            } catch ($boundEx) {
              return $error($boundEx);
            }
          }.bind(this), $error);
        }

        function $If_5() {
          return $If_2.call(this);
        }

        return $If_5.call(this);
      } // exit if transition was invalidated
      // by a route action


      function $If_2() {
        if (transition.invalid) {
          return $return(undefined);
        } // toggle loading flag


        route.loading = false; // sort components into proper order before
        // adding back to route

        route.components = Object.keys(components).sort().map(function (key) {
          return components[key];
        }); // define a result object since
        // we need it twice below

        result = {
          route: route,
          routes: routes,
          strict: strict,
          params: params,
          location: location,
          getState: getState // this callback is useful for ensuring
          // custom actions get dispatched in the
          // same render cycle that gets triggered by
          // the actions being triggered in this file

        };

        if (isFunc(beforeRender)) {
          promise = beforeRender(result);

          if (isPromise(promise)) {
            return Promise.resolve(promise).then(function ($await_8) {
              try {
                return $If_4.call(this);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this), $error);
          }

          function $If_4() {
            return $If_3.call(this);
          }

          return $If_4.call(this);
        } // exit if transition was invalidated
        // by beforeRender callback


        function $If_3() {
          if (transition.invalid) {
            return $return(undefined);
          } // update local route status code if a status change
          // was dispatched in route action or beforeRender


          if (transition.status) {
            route.status = transition.status;
          } // prepare route object for dispatch


          sanitized = sanitize(route); // we don't want these in the state

          delete sanitized.components; // dispatch render route action

          if (dispatch) {
            dispatch(renderRoute({
              route: sanitized,
              params: params,
              location: location
            }));
          }

          return $return(result);
        }

        return $If_3.call(this);
      }

      return $If_2.call(this);
    }

    return $If_1.call(this);
  });
});