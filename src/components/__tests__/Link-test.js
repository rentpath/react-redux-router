import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import Link from '../Link'
import { push, replace } from '../../actions'

describe('Link', () => {
  it('renders an anchor element', () => {
    const wrapper = shallow(<Link to="/" />)
    expect(wrapper.type()).to.equal('a')
  })

  it('renders a string `to` prop', () => {
    const wrapper = shallow(<Link to="/foo" />)
    expect(wrapper.prop('href')).to.equal('/foo')
  })

  it('renders a object `to` prop', () => {
    const wrapper = shallow(<Link to={{ pathname: '/foo' }} />)
    expect(wrapper.prop('href')).to.equal('/foo')
  })

  describe('when clicked', () => {
    const event = {
      button: 0,
      preventDefault: () => null,
    }

    it('dispatches a `changeLocation` action', () => {
      const dispatch = sinon.spy()
      const context = { store: { dispatch } }
      const wrapper = shallow(
        <Link to={{ pathname: '/' }} />,
        { context },
      )
      wrapper.simulate('click', event)
      expect(dispatch).to.have.been.calledWith(push('/'))
    })

    it('handles a `replace` prop', () => {
      const dispatch = sinon.spy()
      const context = { store: { dispatch } }
      const wrapper = shallow(
        <Link to={{ pathname: '/' }} replace />,
        { context },
      )
      wrapper.simulate('click', event)
      expect(dispatch).to.have.been.calledWith(replace('/'))
    })

    it('handles a `onClick` prop', () => {
      const onClick = sinon.spy()
      const wrapper = shallow(<Link to={{ pathname: '/' }} onClick={onClick} />)
      wrapper.simulate('click', event)
      expect(onClick).to.have.been.calledWith(event)
    })

    it('handles a `target` prop', () => {
      const dispatch = sinon.spy()
      const context = { store: { dispatch } }
      const wrapper = shallow(
        <Link to={{ pathname: '/' }} target="#" />,
        { context },
      )
      wrapper.simulate('click', event)
      expect(dispatch.called).to.equal(false)
    })
  })
})
