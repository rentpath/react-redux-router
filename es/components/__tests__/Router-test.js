import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ConnectedRouter from '../Router';
import { INIT_ROUTER, CHANGE_LOCATION } from '../../const';

var Router = ConnectedRouter.WrappedComponent;

describe('Router', function () {
  var setup = function setup(data) {
    var props = _extends({
      dispatch: sinon.spy(),
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
      wrapper: mount(React.createElement(Router, props))
    };
  };

  it('dispatches a `initRouter` action', function () {
    var _setup = setup(),
        props = _setup.props;

    expect(props.dispatch.args).to.have.deep.property('0.0.type', INIT_ROUTER);
  });

  it('dispatches a `push` action if given an initialLocation', function () {
    var _setup2 = setup({ initialLocation: { pathname: '/foo' } }),
        props = _setup2.props;

    expect(props.dispatch.args).to.have.deep.property('1.0.type', CHANGE_LOCATION);
  });

  it('renders the current route', function () {
    var _setup3 = setup(),
        wrapper = _setup3.wrapper;

    expect(wrapper.find('Foo')).to.have.length(1);
    expect(wrapper.find('Bar')).to.have.length(1);
  });

  it('handles a "render" prop', function () {
    var render = sinon.spy(function () {
      return null;
    });
    setup({ render: render });
    expect(render.called).to.equal(true);
    expect(_Object$keys(render.args[0][0])).to.eql(['route', 'location', 'params']);
  });
});