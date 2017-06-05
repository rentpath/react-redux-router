import _regeneratorRuntime from 'babel-runtime/regenerator';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

import parse from 'parse-location';
import transition from './transition';

export default (function () {
  var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(_ref) {
    var location = _ref.location,
        options = _objectWithoutProperties(_ref, ['location']);

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', transition(_extends({}, options, {
              location: parse(location)
            })));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
})();