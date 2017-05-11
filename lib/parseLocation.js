'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseLocation = require('parse-location');

var _parseLocation2 = _interopRequireDefault(_parseLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (path) {
  var location = (0, _parseLocation2.default)(path);
  return {
    pathname: location.pathname,
    search: location.search,
    query: location.query,
    hash: location.hash
  };
};