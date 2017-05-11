import { expect } from 'chai'
import {
  POP,
  PUSH,
  REPLACE,
  GO,
  GO_BACK,
  GO_FORWARD,
  CHANGE_ROUTE,
  RENDER_ROUTE,
  CHANGE_STATUS,
  CHANGE_LOADING,
  CHANGE_LOCATION,
} from '../const'
import {
  pop,
  push,
  replace,
  go,
  goBack,
  goForward,
  changeRoute,
  renderRoute,
  changeStatus,
  changeLoading,
  changeLocation,
} from '../actions'

describe('actions', () => {
  describe('pop', () => {
    it('has a type', () => {
      expect(pop('/foo')).to.have.property('type', CHANGE_LOCATION)
    })

    it('has a method', () => {
      expect(pop('/foo')).to.have.property('method', POP)
    })

    it('has a location', () => {
      expect(pop('/foo')).to.have.property('location').that.is.a('object')
    })
  })

  describe('push', () => {
    it('has a type', () => {
      expect(push('/foo')).to.have.property('type', CHANGE_LOCATION)
    })

    it('has a method', () => {
      expect(push('/foo')).to.have.property('method', PUSH)
    })

    it('has a location', () => {
      expect(push('/foo')).to.have.property('location').that.is.a('object')
    })

    it('can have a status', () => {
      expect(push('/foo', 200)).to.have.property('status', 200)
    })
  })

  describe('replace', () => {
    it('has a type', () => {
      expect(replace('/foo')).to.have.property('type', CHANGE_LOCATION)
    })

    it('has a method', () => {
      expect(replace('/foo')).to.have.property('method', REPLACE)
    })

    it('has a location', () => {
      expect(replace('/foo')).to.have.property('location').that.is.a('object')
    })

    it('can have a status', () => {
      expect(replace('/foo', 301)).to.have.property('status', 301)
    })
  })

  describe('go', () => {
    it('has a type', () => {
      expect(go()).to.have.property('type', GO)
    })

    it('has a index', () => {
      expect(go(-1)).to.have.property('index', -1)
    })
  })

  describe('goBack', () => {
    it('has a type', () => {
      expect(goBack()).to.have.property('type', GO_BACK)
    })
  })

  describe('goForward', () => {
    it('has a type', () => {
      expect(goForward()).to.have.property('type', GO_FORWARD)
    })
  })

  describe('changeLocation', () => {
    it('has a type', () => {
      expect(changeLocation().type).to.equal(CHANGE_LOCATION)
    })

    it('has a location', () => {
      const result = changeLocation({ location: '/foo' })
      expect(result.location).to.be.a('object')
    })
  })

  describe('changeRoute', () => {
    it('has a type', () => {
      expect(changeRoute()).to.have.property('type', CHANGE_ROUTE)
    })

    it('has a route', () => {
      const route = {}
      expect(changeRoute({ route })).to.have.property('route', route)
    })
  })

  describe('renderRoute', () => {
    it('has a type', () => {
      expect(renderRoute()).to.have.property('type', RENDER_ROUTE)
    })

    it('has a route', () => {
      const route = {}
      expect(renderRoute({ route })).to.have.property('route', route)
    })
  })

  describe('changeStatus', () => {
    it('has a type', () => {
      expect(changeStatus()).to.have.property('type', CHANGE_STATUS)
    })

    it('has a status', () => {
      expect(changeStatus(200)).to.have.property('status', 200)
    })
  })

  describe('changeLoading', () => {
    it('has a type', () => {
      expect(changeLoading()).to.have.property('type', CHANGE_LOADING)
    })

    it('has a loading flag', () => {
      expect(changeLoading(true)).to.have.property('loading', true)
    })
  })
})
