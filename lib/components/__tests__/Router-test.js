'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _Router = require('../Router');

var _Router2 = _interopRequireDefault(_Router);

var _const = require('../../const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _Router2.default.WrappedComponent;

describe('Router', function () {
  var setup = function setup(data) {
    var props = (0, _extends3.default)({
      dispatch: _sinon2.default.spy(),
      routes: [],
      router: {
        route: {
          status: 200,
          loading: false
        },
        location: {
          pathname: '/foo'
        },
        params: {
          foo: 'foo'
        }
      },
      route: {
        components: [function Foo(_ref) {
          var children = _ref.children;

          return children;
        }, function Bar() {
          return null;
        }]
      }
    }, data);

    return {
      props: props,
      wrapper: (0, _enzyme.mount)(_react2.default.createElement(Router, props))
    };
  };

  it('dispatches a `initRouter` action', function () {
    var _setup = setup(),
        props = _setup.props;

    (0, _chai.expect)(props.dispatch.args).to.have.deep.property('0.0.type', _const.INIT_ROUTER);
  });

  it('dispatches a `push` action if given an initialLocation', function () {
    var _setup2 = setup({ initialLocation: { pathname: '/foo' } }),
        props = _setup2.props;

    (0, _chai.expect)(props.dispatch.args).to.have.deep.property('1.0.type', _const.CHANGE_LOCATION);
  });

  it('renders the current route', function () {
    var _setup3 = setup(),
        wrapper = _setup3.wrapper;

    (0, _chai.expect)(wrapper.find('Foo')).to.have.length(1);
    (0, _chai.expect)(wrapper.find('Bar')).to.have.length(1);
  });

  it('handles a "render" prop', function () {
    var render = _sinon2.default.spy(function () {
      return null;
    });
    setup({ render: render });
    (0, _chai.expect)(render.called).to.equal(true);
    (0, _chai.expect)((0, _keys2.default)(render.args[0][0])).to.eql(['route', 'location', 'params']);
  });
});