'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitize = exports.isPromise = exports.isFunc = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFunc = exports.isFunc = function isFunc(val) {
  return typeof val === 'function';
};

var isPromise = exports.isPromise = function isPromise(val) {
  return val && isFunc(val.then) || false;
};

var sanitize = exports.sanitize = function sanitize(obj) {
  return (0, _keys2.default)(obj).filter(function (key) {
    return !isFunc(obj[key]);
  }).reduce(function (acc, key) {
    acc[key] = obj[key];
    return acc;
  }, {});
};