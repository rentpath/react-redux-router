'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chai = require('chai');

var _match = require('../match');

var _match2 = _interopRequireDefault(_match);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('match', function () {
  it('returns a transition result', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _match2.default)({
              routes: [],
              location: '/foo'
            });

          case 2:
            result = _context.sent;

            (0, _chai.expect)(result).to.have.property('location');
            (0, _chai.expect)(result).to.have.property('route');
            (0, _chai.expect)(result).to.have.property('params');
            (0, _chai.expect)(result).to.have.property('routes');
            (0, _chai.expect)(result).to.have.property('strict');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});