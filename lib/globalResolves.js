"use strict";

exports.__esModule = true;
exports.default = exports.getGlobalResolves = void 0;
var resolveOnAll = [];

var getGlobalResolves = function getGlobalResolves() {
  return [].concat(resolveOnAll);
};

exports.getGlobalResolves = getGlobalResolves;

var _default = function _default(resolveFunc) {
  return resolveOnAll.push(resolveFunc);
};

exports.default = _default;