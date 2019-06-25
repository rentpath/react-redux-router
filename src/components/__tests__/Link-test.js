import { Provider } from 'react-redux'
import React from 'react'
import configureStore from 'redux-mock-store'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import Link from '../Link'
import { push, replace } from '../../actions'

describe('Link', () => {
  let dispatch

  const setup = props => {
    const middlewares = []
    const initialState = {}
    const mockStore = configureStore(middlewares)(initialState)
    dispatch = sinon.spy()
    mockStore.dispatch = dispatch

    return mount(
      <Provider store={mockStore}>
        <Link {...props} />
      </Provider>
    )
  }

  it('renders an anchor element', () => {
    const wrapper = setup({ to: '/' })
    expect(wrapper.find('InnerLink a').length).to.equal(1)
  })

  it('renders a string `to` prop', () => {
    const wrapper = setup({ to: '/foo' })
    expect(wrapper.find('InnerLink a').prop('href')).to.equal('/foo')
  })

  it('renders a object `to` prop', () => {
    const wrapper = setup({ to: { pathname: '/foo' } })
    expect(wrapper.find('InnerLink a').prop('href')).to.equal('/foo')
  })

  describe('when clicked', () => {
    const event = {
      button: 0,
      preventDefault: () => null,
    }

    it('dispatches a `changeLocation` action', () => {
      const wrapper = setup({ to: { pathname: '/' } })
      wrapper.find('InnerLink').simulate('click', event)
      expect(dispatch).to.have.been.calledWith(push('/'))
    })

    it('handles a `replace` prop', () => {
      const wrapper = setup(
        { to: { pathname: '/' }, replace: true }
      )
      wrapper.find('InnerLink').simulate('click', event)
      expect(dispatch).to.have.been.calledWith(replace('/'))
    })

    it('handles a `onClick` prop', () => {
      const onClick = sinon.spy()
      const wrapper = setup({ to: { pathname: '/' }, onClick })
      wrapper.find('InnerLink').simulate('click', event)
      const calledWithSyntheticEvent = onClick
        .args[0][0]
        .constructor
        .name === 'SyntheticEvent'
      expect(calledWithSyntheticEvent).to.equal(true)
    })

    it('handles a `target` prop', () => {
      const wrapper = setup({ to: { pathname: '/' }, target: '#' })
      wrapper.find('InnerLink').simulate('click', event)
      expect(dispatch.called).to.equal(false)
    })
  })
})
