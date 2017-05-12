import { expect } from 'chai'
import sinon from 'sinon'
import transition from '../transition'
import { CHANGE_ROUTE, RENDER_ROUTE, STATUS_OK, STATUS_NOT_FOUND } from '../const'

describe('transition', () => {
  const location = {
    pathname: '/foo',
  }
  const components = {
    Foo: () => null,
    Bar: () => null,
    Baz: () => null,
  }

  it('returns a matched route', async () => {
    const routes = [{ path: '/foo', name: 'foo' }]
    const result = await transition({ routes, location })
    expect(result).to.have.deep.property('route.name', 'foo')
  })

  it('returns a default route status', async () => {
    const routes = [{ path: '/foo' }]
    const result = await transition({ routes, location })
    expect(result).to.have.deep.property('route.status', STATUS_OK)
  })

  it('returns a default route', async () => {
    const result = await transition({ routes: [], location })
    expect(result).to.have.deep.property('route.status', STATUS_NOT_FOUND)
  })

  it('returns matched params', async () => {
    const routes = [{ path: '/:name' }]
    const result = await transition({ routes, location })
    expect(result.params).to.eql({ name: 'foo' })
  })

  it('returns a location', async () => {
    const result = await transition({ routes: [], location })
    expect(result).to.have.property('location', location)
  })

  it('returns the provided routes', async () => {
    const routes = [{ path: '/foo' }]
    const result = await transition({ routes, location })
    expect(result).to.have.property('routes', routes)
  })

  it('returns the provided `strict` option', async () => {
    const strict = false
    const result = await transition({ routes: [], location, strict })
    expect(result).to.have.property('strict', strict)
  })

  it('resolves routes', async () => {
    const routes = [{
      path: '/',
      resolve: async () => ({
        component: components.Foo,
      }),
      routes: [{
        path: '/bar',
        resolve: async () => (
          new Promise(resolve => {
            setTimeout(() => {
              resolve({
                component: components.Bar,
              })
            }, 100)
          })
        ),
        routes: [{
          path: '/baz',
          resolve: async () => ({
            component: components.Baz,
          }),
        }],
      }],
    }]
    const result = await transition({
      location: { pathname: '/bar/baz' },
      routes,
    })
    expect(result.route.components).to.eql([
      components.Foo,
      components.Bar,
      components.Baz,
    ])
  })

  it('calls a beforeRender callback', async () => {
    const beforeRender = sinon.spy()
    await transition({ routes: [], location, beforeRender })
    expect(beforeRender.called).to.equal(true)
  })

  describe('when given a dispatch function', () => {
    describe('it dispatches router actions', () => {
      const setup = async () => {
        const routes = [{ path: '/foo' }]
        const dispatch = sinon.spy()
        await transition({ location, dispatch, routes })
        return { args: dispatch.args }
      }

      it(`dispatches a ${CHANGE_ROUTE} action`, async () => {
        const { args } = await setup()
        expect(args).to.have.deep.property('0.0.type', CHANGE_ROUTE)
        expect(args).to.have.deep.property('0.0.route').that.is.a('object')
        expect(args).to.have.deep.property('0.0.params').that.is.a('object')
        expect(args).to.have.deep.property('0.0.location').that.is.a('object')
      })

      it(`dispatches a ${RENDER_ROUTE} action`, async () => {
        const { args } = await setup()
        expect(args).to.have.deep.property('1.0.type', RENDER_ROUTE)
        expect(args).to.have.deep.property('1.0.route').that.is.a('object')
        expect(args).to.have.deep.property('1.0.params').that.is.a('object')
        expect(args).to.have.deep.property('1.0.location').that.is.a('object')
      })
    })

    it('dispatches pojo route actions', async () => {
      const action = { type: 'FOO' }
      const dispatch = sinon.spy()
      const routes = [{ path: '/foo', action }]
      await transition({ location, routes, dispatch })
      expect(dispatch).to.have.been.calledWith(action)
    })

    it('dispatches function route actions', async () => {
      const action = () => ({ type: 'BAR' })
      const dispatch = sinon.spy()
      const routes = [{ path: '/foo', action }]
      await transition({ location, routes, dispatch })
      expect(dispatch).to.have.been.calledWith(action())
    })

    it('dispatches route actions loaded via resolver', async () => {
      const dispatch = sinon.spy()
      const action = { type: 'FOO' }
      const routes = [{
        path: '/foo',
        resolve: async () => ({ action }),
      }]
      await transition({ location, routes, dispatch })
      expect(dispatch).to.have.been.calledWith(action)
    })
  })
})
