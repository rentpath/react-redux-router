"use strict";

exports.__esModule = true;
exports.sanitize = exports.isPromise = exports.isFunc = void 0;

var isFunc = function isFunc(val) {
  return typeof val === 'function';
};

exports.isFunc = isFunc;

var isPromise = function isPromise(val) {
  return val && isFunc(val.then) || false;
};

exports.isPromise = isPromise;

var sanitize = function sanitize(obj) {
  return Object.keys(obj).filter(function (key) {
    return !isFunc(obj[key]);
  }).reduce(function (acc, key) {
    acc[key] = obj[key];
    return acc;
  }, {});
};

exports.sanitize = sanitize;