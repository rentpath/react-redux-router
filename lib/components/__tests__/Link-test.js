'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _Link = require('../Link');

var _Link2 = _interopRequireDefault(_Link);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Link', function () {
  it('renders an anchor element', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Link2.default, { to: '/' }));
    (0, _chai.expect)(wrapper.type()).to.equal('a');
  });

  it('renders a string `to` prop', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Link2.default, { to: '/foo' }));
    (0, _chai.expect)(wrapper.prop('href')).to.equal('/foo');
  });

  it('renders a object `to` prop', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Link2.default, { to: { pathname: '/foo' } }));
    (0, _chai.expect)(wrapper.prop('href')).to.equal('/foo');
  });

  describe('when clicked', function () {
    var event = {
      button: 0,
      preventDefault: function preventDefault() {
        return null;
      }
    };

    it('dispatches a `changeLocation` action', function () {
      var dispatch = _sinon2.default.spy();
      var context = { store: { dispatch: dispatch } };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Link2.default, { to: { pathname: '/' } }), { context: context });
      wrapper.simulate('click', event);
      (0, _chai.expect)(dispatch).to.have.been.calledWith((0, _actions.push)('/'));
    });

    it('handles a `replace` prop', function () {
      var dispatch = _sinon2.default.spy();
      var context = { store: { dispatch: dispatch } };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Link2.default, { to: { pathname: '/' }, replace: true }), { context: context });
      wrapper.simulate('click', event);
      (0, _chai.expect)(dispatch).to.have.been.calledWith((0, _actions.replace)('/'));
    });

    it('handles a `onClick` prop', function () {
      var onClick = _sinon2.default.spy();
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Link2.default, { to: { pathname: '/' }, onClick: onClick }));
      wrapper.simulate('click', event);
      (0, _chai.expect)(onClick).to.have.been.calledWith(event);
    });

    it('handles a `target` prop', function () {
      var dispatch = _sinon2.default.spy();
      var context = { store: { dispatch: dispatch } };
      var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Link2.default, { to: { pathname: '/' }, target: '#' }), { context: context });
      wrapper.simulate('click', event);
      (0, _chai.expect)(dispatch.called).to.equal(false);
    });
  });
});