import _regeneratorRuntime from 'babel-runtime/regenerator';
import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

import match from './match';
import { push } from './actions';

export default (function () {
  var _ref2 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(_ref) {
    var store = _ref.store,
        location = _ref.location,
        options = _objectWithoutProperties(_ref, ['store', 'location']);

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (store) {
              _context.next = 2;
              break;
            }

            throw new Error('Expected to receive a redux store.');

          case 2:
            return _context.abrupt('return', match(_extends({
              dispatch: store.dispatch,
              location: store.dispatch(push(location)).location
            }, options)));

          case 3:
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