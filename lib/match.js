"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _parseLocation = _interopRequireDefault(require("parse-location"));

var _transition = _interopRequireDefault(require("./transition"));

var _default = function _default(_ref) {
  return new Promise(function ($return, $error) {
    var location = _ref.location,
        options = (0, _objectWithoutProperties2.default)(_ref, ["location"]);
    return $return((0, _transition.default)((0, _objectSpread2.default)({}, options, {
      location: (0, _parseLocation.default)(location)
    })));
  });
};

exports.default = _default;