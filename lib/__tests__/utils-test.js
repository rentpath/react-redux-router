'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _chai = require('chai');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('utils', function () {
  describe('isFunc', function () {
    it('returns true if value is a function', function () {
      (0, _chai.expect)((0, _utils.isFunc)(function () {})).to.equal(true);
    });

    it('returns false if value is not a function', function () {
      (0, _chai.expect)((0, _utils.isFunc)(null)).to.equal(false);
      (0, _chai.expect)((0, _utils.isFunc)(undefined)).to.equal(false);
      (0, _chai.expect)((0, _utils.isFunc)(0)).to.equal(false);
      (0, _chai.expect)((0, _utils.isFunc)('')).to.equal(false);
      (0, _chai.expect)((0, _utils.isFunc)({})).to.equal(false);
    });
  });

  describe('isPromise', function () {
    it('returns true if value is a promise', function () {
      (0, _chai.expect)((0, _utils.isPromise)(_promise2.default.resolve())).to.equal(true);
    });

    it('returns false if value is not a promise', function () {
      (0, _chai.expect)((0, _utils.isPromise)(function () {})).to.equal(false);
      (0, _chai.expect)((0, _utils.isPromise)(null)).to.equal(false);
      (0, _chai.expect)((0, _utils.isPromise)(undefined)).to.equal(false);
      (0, _chai.expect)((0, _utils.isPromise)(0)).to.equal(false);
      (0, _chai.expect)((0, _utils.isPromise)('')).to.equal(false);
      (0, _chai.expect)((0, _utils.isPromise)({})).to.equal(false);
    });
  });

  describe('sanitize', function () {
    it('removes function props', function () {
      var obj = {
        foo: 'foo',
        bar: function bar() {
          return null;
        }
      };
      (0, _chai.expect)((0, _utils.sanitize)(obj)).to.eql({
        foo: 'foo'
      });
    });
  });
});