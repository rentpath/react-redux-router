'use strict';

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

describe('Router', function () {
  var setup = function setup() {
    return {
      context: {
        store: {
          dispatch: _sinon2.default.spy(),
          subscribe: function subscribe() {
            return null;
          },
          getState: function getState() {
            return {
              router: {
                route: {
                  loading: false
                },
                location: {
                  pathname: '/foo'
                }
              }
            };
          }
        }
      },
      props: {
        routes: [],
        params: {
          foo: 'foo'
        },
        route: {
          name: 'foo',
          components: [function Foo(_ref) {
            var children = _ref.children;

            return children;
          }, function Bar() {
            return null;
          }]
        }
      }
    };
  };

  it('dispatches a `initRouter` action', function () {
    var _setup = setup(),
        props = _setup.props,
        context = _setup.context;

    (0, _enzyme.mount)(_react2.default.createElement(_Router2.default, props), { context: context });
    var args = context.store.dispatch.args;

    (0, _chai.expect)(args).to.have.deep.property('0.0.type', _const.INIT_ROUTER);
  });

  it('dispatches a `push` action if given an initialLocation', function () {
    var _setup2 = setup(),
        props = _setup2.props,
        context = _setup2.context;

    var location = { pathname: '/foo' };
    (0, _enzyme.mount)(_react2.default.createElement(_Router2.default, (0, _extends3.default)({}, props, { initialLocation: location })), { context: context });
    var args = context.store.dispatch.args;

    (0, _chai.expect)(args).to.have.deep.property('1.0.type', _const.CHANGE_LOCATION);
  });

  it('renders the current route', function () {
    var _setup3 = setup(),
        props = _setup3.props,
        context = _setup3.context;

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_Router2.default, props), { context: context });
    (0, _chai.expect)(wrapper.find('Foo')).to.have.length(1);
    (0, _chai.expect)(wrapper.find('Bar')).to.have.length(1);
  });
});