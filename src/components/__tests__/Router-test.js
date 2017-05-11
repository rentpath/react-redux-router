import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import Router from '../Router'
import { INIT_ROUTER, CHANGE_LOCATION } from '../../const'

describe('Router', () => {
  const setup = () => ({
    context: {
      store: {
        dispatch: sinon.spy(),
        subscribe: () => null,
        getState: () => ({
          router: {
            route: {
              loading: false,
            },
            location: {
              pathname: '/foo',
            },
          },
        }),
      },
    },
    props: {
      routes: [],
      params: {
        foo: 'foo',
      },
      route: {
        name: 'foo',
        components: [
          function Foo({ children }) {
            return children
          },
          function Bar() {
            return null
          },
        ],
      },
    },
  })


  it('dispatches a `initRouter` action', () => {
    const { props, context } = setup()
    mount(<Router {...props} />, { context })
    const { args } = context.store.dispatch
    expect(args).to.have.deep.property('0.0.type', INIT_ROUTER)
  })

  it('dispatches a `push` action if given an initialLocation', () => {
    const { props, context } = setup()
    const location = { pathname: '/foo' }
    mount(<Router {...props} initialLocation={location} />, { context })
    const { args } = context.store.dispatch
    expect(args).to.have.deep.property('1.0.type', CHANGE_LOCATION)
  })

  it('renders the current route', () => {
    const { props, context } = setup()
    const wrapper = mount(<Router {...props} />, { context })
    expect(wrapper.find('Foo')).to.have.length(1)
    expect(wrapper.find('Bar')).to.have.length(1)
  })
})
