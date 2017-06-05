import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

import { expect } from 'chai';
import sinon from 'sinon';
import initialize from '../initialize';
import { push } from '../actions';

describe('initialize', function () {
  it('dispatches a push action', _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
    var location, store;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            location = '/foo';
            store = {
              dispatch: sinon.spy(function (arg) {
                return arg;
              })
            };
            _context.next = 4;
            return initialize({ location: location, store: store, routes: [] });

          case 4:
            expect(store.dispatch).to.have.been.calledWith(push(location));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('throws when not given a store', function () {
    expect(initialize).to.throw(Error);
  });
});