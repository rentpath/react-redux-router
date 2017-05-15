import { expect } from 'chai'
import reduce, { initial } from '../reducer'
import {
  CHANGE_ROUTE,
  RENDER_ROUTE,
  CHANGE_STATUS,
  CHANGE_LOADING,
  CHANGE_LOCATION,
} from '../const'

describe('reducer', () => {
  describe(CHANGE_LOCATION, () => {
    const action = {
      type: CHANGE_LOCATION,
      location: {
        pathname: '/foo',
      },
    }

    it('sets location', () => {
      const state = reduce(initial, action)
      expect(state.location.pathname).to.equal('/foo')
    })

    it('carries over a host value', () => {
      const state = reduce({ ...initial, location: { host: 'foo.com' } }, action)
      expect(state.location.host).to.equal('foo.com')
    })

    it('carries over a port value', () => {
      const state = reduce({ ...initial, location: { port: '80' } }, action)
      expect(state.location.port).to.equal('80')
    })

    it('carries over a hostname value', () => {
      const state = reduce({ ...initial, location: { hostname: 'foo.com' } }, action)
      expect(state.location.hostname).to.equal('foo.com')
    })

    it('carries over a protocol value', () => {
      const state = reduce({ ...initial, location: { protocol: 'http:' } }, action)
      expect(state.location.protocol).to.equal('http:')
    })

    it('builds a partial href', () => {
      const state = reduce(initial, action)
      expect(state.location.href).to.equal('/foo')
    })

    it('builds a complete href', () => {
      const state = reduce(initial, {
        ...action,
        location: {
          protocol: 'http:',
          hostname: 'foo.com',
          pathname: '/bar',
        },
      })
      expect(state.location.href).to.equal('http://foo.com/bar')
    })

    it('sets route status when provied', () => {
      const status = 301
      const state = reduce(initial, { ...action, status })
      expect(state.route.status).to.equal(status)
    })

    it('only sets route status when provided', () => {
      const status = 301
      const state = reduce({ ...initial, route: { ...initial.route, status } }, action)
      expect(state.route.status).to.equal(status)
    })
  })

  describe(CHANGE_ROUTE, () => {
    const action = {
      type: CHANGE_ROUTE,
      params: {
        foo: 'bar',
      },
      route: {
        name: 'foo',
        status: 200,
        loading: true,
      },
    }

    it('sets route props', () => {
      const state = reduce(initial, action)
      expect(state.route.name).to.equal('foo')
      expect(state.route.status).to.equal(200)
      expect(state.route.loading).to.equal(true)
    })

    it('sets params', () => {
      const state = reduce(initial, action)
      expect(state.params).to.eql(action.params)
    })
  })

  describe(RENDER_ROUTE, () => {
    const action = {
      type: RENDER_ROUTE,
      route: {
        name: 'bar',
        status: 200,
        loading: false,
      },
    }

    it('sets route props', () => {
      const state = reduce(initial, action)
      expect(state.route.name).to.equal('bar')
      expect(state.route.status).to.equal(200)
      expect(state.route.loading).to.equal(false)
    })
  })

  describe(CHANGE_STATUS, () => {
    const action = {
      type: CHANGE_STATUS,
      status: 301,
    }

    it('sets route status', () => {
      const state = reduce(initial, action)
      expect(state.route.status).to.equal(action.status)
    })
  })

  describe(CHANGE_LOADING, () => {
    const action = {
      type: CHANGE_LOADING,
      loading: true,
    }

    it('sets loading', () => {
      const state = reduce(initial, action)
      expect(state.route.loading).to.equal(action.loading)
    })
  })
})
