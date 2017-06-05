import _Promise from 'babel-runtime/core-js/promise';
import { expect } from 'chai';
import { isFunc, isPromise, sanitize } from '../utils';

describe('utils', function () {
  describe('isFunc', function () {
    it('returns true if value is a function', function () {
      expect(isFunc(function () {})).to.equal(true);
    });

    it('returns false if value is not a function', function () {
      expect(isFunc(null)).to.equal(false);
      expect(isFunc(undefined)).to.equal(false);
      expect(isFunc(0)).to.equal(false);
      expect(isFunc('')).to.equal(false);
      expect(isFunc({})).to.equal(false);
    });
  });

  describe('isPromise', function () {
    it('returns true if value is a promise', function () {
      expect(isPromise(_Promise.resolve())).to.equal(true);
    });

    it('returns false if value is not a promise', function () {
      expect(isPromise(function () {})).to.equal(false);
      expect(isPromise(null)).to.equal(false);
      expect(isPromise(undefined)).to.equal(false);
      expect(isPromise(0)).to.equal(false);
      expect(isPromise('')).to.equal(false);
      expect(isPromise({})).to.equal(false);
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
      expect(sanitize(obj)).to.eql({
        foo: 'foo'
      });
    });
  });
});