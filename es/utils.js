import _Object$keys from 'babel-runtime/core-js/object/keys';
export var isFunc = function isFunc(val) {
  return typeof val === 'function';
};

export var isPromise = function isPromise(val) {
  return val && isFunc(val.then) || false;
};

export var sanitize = function sanitize(obj) {
  return _Object$keys(obj).filter(function (key) {
    return !isFunc(obj[key]);
  }).reduce(function (acc, key) {
    acc[key] = obj[key];
    return acc;
  }, {});
};