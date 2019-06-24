import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import ConnectedRouter from '../Router'
import { INIT_ROUTER, CHANGE_LOCATION } from '../../const'

const Router = ConnectedRouter.WrappedComponent

describe('Router', () => {
  const setup = data => {
    const props = {
      dispatch: sinon.spy(),
      getState: () => {},
      routes: [],
      router: {
        route: {
          status: 200,
          loading: false,
        },
        location: {
          pathname: '/foo',
        },
        params: {
          foo: 'foo',
        },
      },
      route: {
        components: [
          function Foo({ children }) {
            return children
          },
          function Bar() {
            return null
          },
        ],
      },
      ...data,
    }

    return {
      props,
      wrapper: mount(
        <Router {...props} />
      ),
    }
  }


  it('dispatches a `initRouter` action', () => {
    const { props } = setup()
    expect(props.dispatch.args).to.have.deep.nested.property('0.0.type', INIT_ROUTER)
  })

  it('dispatches a `push` action if given an initialLocation', () => {
    const { props } = setup({ initialLocation: { pathname: '/foo' } })
    expect(props.dispatch.args).to.have.deep.nested.property('1.0.type', CHANGE_LOCATION)
  })

  it('renders the current route', () => {
    const { wrapper } = setup()
    expect(wrapper.find('Foo')).to.have.length(1)
    expect(wrapper.find('Bar')).to.have.length(1)
  })

  it('handles a "render" prop', () => {
    const render = sinon.spy(() => null)
    setup({ render })
    expect(render.called).to.equal(true)
    expect(Object.keys(render.args[0][0])).to.eql(['route', 'location', 'params'])
  })
})
