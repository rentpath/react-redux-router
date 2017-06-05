import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

import { expect } from 'chai';
import match from '../match';

describe('match', function () {
  it('returns a transition result', _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
    var result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return match({
              routes: [],
              location: '/foo'
            });

          case 2:
            result = _context.sent;

            expect(result).to.have.property('location');
            expect(result).to.have.property('route');
            expect(result).to.have.property('params');
            expect(result).to.have.property('routes');
            expect(result).to.have.property('strict');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});