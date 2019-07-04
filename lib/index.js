"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.addGlobalResolve = exports.match = exports.middleware = exports.reducer = exports.Link = exports.Router = exports.initialize = exports.changeLoading = exports.changeStatus = exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.pop = exports.CHANGE_LOCATION = exports.CHANGE_LOADING = exports.CHANGE_STATUS = exports.CHANGE_ROUTE = exports.GO_FORWARD = exports.GO_BACK = exports.GO = exports.REPLACE = exports.PUSH = exports.POP = void 0;

var _const = require("./const");

exports.POP = _const.POP;
exports.PUSH = _const.PUSH;
exports.REPLACE = _const.REPLACE;
exports.GO = _const.GO;
exports.GO_BACK = _const.GO_BACK;
exports.GO_FORWARD = _const.GO_FORWARD;
exports.CHANGE_ROUTE = _const.CHANGE_ROUTE;
exports.CHANGE_STATUS = _const.CHANGE_STATUS;
exports.CHANGE_LOADING = _const.CHANGE_LOADING;
exports.CHANGE_LOCATION = _const.CHANGE_LOCATION;

var _actions = require("./actions");

exports.pop = _actions.pop;
exports.push = _actions.push;
exports.replace = _actions.replace;
exports.go = _actions.go;
exports.goBack = _actions.goBack;
exports.goForward = _actions.goForward;
exports.changeStatus = _actions.changeStatus;
exports.changeLoading = _actions.changeLoading;

var _initialize = _interopRequireDefault(require("./initialize"));

exports.initialize = _initialize.default;

var _Router = _interopRequireDefault(require("./components/Router"));

exports.Router = _Router.default;

var _Link = _interopRequireDefault(require("./components/Link"));

exports.Link = _Link.default;

var _reducer = _interopRequireDefault(require("./reducer"));

exports.reducer = _reducer.default;

var _middleware = _interopRequireDefault(require("./middleware"));

exports.middleware = _middleware.default;

var _match = _interopRequireDefault(require("./match"));

exports.match = _match.default;

var _globalResolves = _interopRequireDefault(require("./globalResolves"));

exports.addGlobalResolve = _globalResolves.default;