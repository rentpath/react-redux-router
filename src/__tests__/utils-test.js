import { expect } from 'chai'
import { isFunc, isPromise, sanitize } from '../utils'

describe('utils', () => {
  describe('isFunc', () => {
    it('returns true if value is a function', () => {
      expect(isFunc(() => {})).to.equal(true)
    })

    it('returns false if value is not a function', () => {
      expect(isFunc(null)).to.equal(false)
      expect(isFunc(undefined)).to.equal(false)
      expect(isFunc(0)).to.equal(false)
      expect(isFunc('')).to.equal(false)
      expect(isFunc({})).to.equal(false)
    })
  })

  describe('isPromise', () => {
    it('returns true if value is a promise', () => {
      expect(isPromise(Promise.resolve())).to.equal(true)
    })

    it('returns false if value is not a promise', () => {
      expect(isPromise(() => {})).to.equal(false)
      expect(isPromise(null)).to.equal(false)
      expect(isPromise(undefined)).to.equal(false)
      expect(isPromise(0)).to.equal(false)
      expect(isPromise('')).to.equal(false)
      expect(isPromise({})).to.equal(false)
    })
  })

  describe('sanitize', () => {
    it('removes function props', () => {
      const obj = {
        foo: 'foo',
        bar: () => null,
      }
      expect(sanitize(obj)).to.eql({
        foo: 'foo',
      })
    })
  })
})
