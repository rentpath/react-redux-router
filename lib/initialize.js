"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _match = _interopRequireDefault(require("./match"));

var _actions = require("./actions");

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var store = _ref.store,
      location = _ref.location,
      options = (0, _objectWithoutProperties2.default)(_ref, ["store", "location"]);

  if (!store) {
    throw new Error('Expected to receive a redux store.');
  }

  return (0, _match.default)((0, _objectSpread2.default)({
    dispatch: store.dispatch,
    getState: store.getState,
    location: store.dispatch((0, _actions.push)(location)).location
  }, options));
};

exports.default = _default;