'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var POP = exports.POP = 'POP';
var PUSH = exports.PUSH = 'PUSH';
var REPLACE = exports.REPLACE = 'REPLACE';

var GO = exports.GO = '@@router/GO';
var GO_BACK = exports.GO_BACK = '@@router/GO_BACK';
var GO_FORWARD = exports.GO_FORWARD = '@@router/GO_FORWARD';

var INIT_ROUTER = exports.INIT_ROUTER = '@@router/INIT';
var CHANGE_ROUTE = exports.CHANGE_ROUTE = '@@router/CHANGE_ROUTE';
var RENDER_ROUTE = exports.RENDER_ROUTE = '@@router/RENDER_ROUTE';
var CHANGE_STATUS = exports.CHANGE_STATUS = '@@router/CHANGE_STATUS';
var CHANGE_LOADING = exports.CHANGE_LOADING = '@@router/CHANGE_LOADING';
var CHANGE_LOCATION = exports.CHANGE_LOCATION = '@@router/CHANGE_LOCATION';

var STATUS_OK = exports.STATUS_OK = 200;
var STATUS_NOT_FOUND = exports.STATUS_NOT_FOUND = 404;