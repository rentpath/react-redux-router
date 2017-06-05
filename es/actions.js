import _extends from 'babel-runtime/helpers/extends';
import parse from 'parse-location';
import { POP, PUSH, REPLACE, GO, GO_BACK, GO_FORWARD, INIT_ROUTER, CHANGE_ROUTE, RENDER_ROUTE, CHANGE_STATUS, CHANGE_LOADING, CHANGE_LOCATION } from './const';

export var initRouter = function initRouter(router) {
  return {
    type: INIT_ROUTER,
    router: router
  };
};

export var changeRoute = function changeRoute(payload) {
  return _extends({
    type: CHANGE_ROUTE
  }, payload);
};

export var renderRoute = function renderRoute(payload) {
  return _extends({
    type: RENDER_ROUTE
  }, payload);
};

export var changeStatus = function changeStatus(status) {
  return {
    type: CHANGE_STATUS,
    status: status
  };
};

export var changeLoading = function changeLoading(loading) {
  return {
    type: CHANGE_LOADING,
    loading: loading
  };
};

export var changeLocation = function changeLocation() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _extends({
    type: CHANGE_LOCATION
  }, payload, {
    location: parse(payload.location || '')
  });
};

export var pop = function pop(location) {
  return changeLocation({
    method: POP,
    location: location
  });
};

export var push = function push(location, status) {
  return changeLocation({
    method: PUSH,
    location: location,
    status: status
  });
};

export var replace = function replace(location, status) {
  return changeLocation({
    method: REPLACE,
    location: location,
    status: status
  });
};

export var go = function go(index) {
  return {
    type: GO,
    index: index
  };
};

export var goBack = function goBack() {
  return {
    type: GO_BACK
  };
};

export var goForward = function goForward() {
  return {
    type: GO_FORWARD
  };
};