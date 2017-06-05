import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Link from '../Link';
import { push, replace } from '../../actions';

describe('Link', function () {
  it('renders an anchor element', function () {
    var wrapper = shallow(React.createElement(Link, { to: '/' }));
    expect(wrapper.type()).to.equal('a');
  });

  it('renders a string `to` prop', function () {
    var wrapper = shallow(React.createElement(Link, { to: '/foo' }));
    expect(wrapper.prop('href')).to.equal('/foo');
  });

  it('renders a object `to` prop', function () {
    var wrapper = shallow(React.createElement(Link, { to: { pathname: '/foo' } }));
    expect(wrapper.prop('href')).to.equal('/foo');
  });

  describe('when clicked', function () {
    var event = {
      button: 0,
      preventDefault: function preventDefault() {
        return null;
      }
    };

    it('dispatches a `changeLocation` action', function () {
      var dispatch = sinon.spy();
      var context = { store: { dispatch: dispatch } };
      var wrapper = shallow(React.createElement(Link, { to: { pathname: '/' } }), { context: context });
      wrapper.simulate('click', event);
      expect(dispatch).to.have.been.calledWith(push('/'));
    });

    it('handles a `replace` prop', function () {
      var dispatch = sinon.spy();
      var context = { store: { dispatch: dispatch } };
      var wrapper = shallow(React.createElement(Link, { to: { pathname: '/' }, replace: true }), { context: context });
      wrapper.simulate('click', event);
      expect(dispatch).to.have.been.calledWith(replace('/'));
    });

    it('handles a `onClick` prop', function () {
      var onClick = sinon.spy();
      var wrapper = shallow(React.createElement(Link, { to: { pathname: '/' }, onClick: onClick }));
      wrapper.simulate('click', event);
      expect(onClick).to.have.been.calledWith(event);
    });

    it('handles a `target` prop', function () {
      var dispatch = sinon.spy();
      var context = { store: { dispatch: dispatch } };
      var wrapper = shallow(React.createElement(Link, { to: { pathname: '/' }, target: '#' }), { context: context });
      wrapper.simulate('click', event);
      expect(dispatch.called).to.equal(false);
    });
  });
});