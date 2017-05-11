'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _initialize = require('../initialize');

var _initialize2 = _interopRequireDefault(_initialize);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('initialize', function () {
  it('dispatches a push action', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var location, store;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            location = '/foo';
            store = {
              dispatch: _sinon2.default.spy(function (arg) {
                return arg;
              })
            };
            _context.next = 4;
            return (0, _initialize2.default)({ location: location, store: store, routes: [] });

          case 4:
            (0, _chai.expect)(store.dispatch).to.have.been.calledWith((0, _actions.push)(location));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));

  it('throws when not given a store', function () {
    (0, _chai.expect)(_initialize2.default).to.throw(Error);
  });
});