import _extends from 'babel-runtime/helpers/extends';
import { expect } from 'chai';
import reduce, { initial } from '../reducer';
import { CHANGE_ROUTE, RENDER_ROUTE, CHANGE_STATUS, CHANGE_LOADING, CHANGE_LOCATION } from '../const';

describe('reducer', function () {
  describe(CHANGE_LOCATION, function () {
    var action = {
      type: CHANGE_LOCATION,
      location: {
        pathname: '/foo'
      }
    };

    it('sets location', function () {
      var state = reduce(initial, action);
      expect(state.location.pathname).to.equal('/foo');
    });

    it('carries over a host value', function () {
      var state = reduce(_extends({}, initial, { location: { host: 'foo.com' } }), action);
      expect(state.location.host).to.equal('foo.com');
    });

    it('carries over a port value', function () {
      var state = reduce(_extends({}, initial, { location: { port: '80' } }), action);
      expect(state.location.port).to.equal('80');
    });

    it('carries over a hostname value', function () {
      var state = reduce(_extends({}, initial, { location: { hostname: 'foo.com' } }), action);
      expect(state.location.hostname).to.equal('foo.com');
    });

    it('carries over a protocol value', function () {
      var state = reduce(_extends({}, initial, { location: { protocol: 'http:' } }), action);
      expect(state.location.protocol).to.equal('http:');
    });

    it('builds a partial href', function () {
      var state = reduce(initial, action);
      expect(state.location.href).to.equal('/foo');
    });

    it('builds a complete href', function () {
      var state = reduce(initial, _extends({}, action, {
        location: {
          protocol: 'http:',
          hostname: 'foo.com',
          pathname: '/bar'
        }
      }));
      expect(state.location.href).to.equal('http://foo.com/bar');
    });

    it('sets route status when provied', function () {
      var status = 301;
      var state = reduce(initial, _extends({}, action, { status: status }));
      expect(state.route.status).to.equal(status);
    });

    it('only sets route status when provided', function () {
      var status = 301;
      var state = reduce(_extends({}, initial, { route: _extends({}, initial.route, { status: status }) }), action);
      expect(state.route.status).to.equal(status);
    });
  });

  describe(CHANGE_ROUTE, function () {
    var action = {
      type: CHANGE_ROUTE,
      params: {
        foo: 'bar'
      },
      route: {
        name: 'foo',
        status: 200,
        loading: true
      }
    };

    it('sets route props', function () {
      var state = reduce(initial, action);
      expect(state.route.name).to.equal('foo');
      expect(state.route.status).to.equal(200);
      expect(state.route.loading).to.equal(true);
    });

    it('sets params', function () {
      var state = reduce(initial, action);
      expect(state.params).to.eql(action.params);
    });
  });

  describe(RENDER_ROUTE, function () {
    var action = {
      type: RENDER_ROUTE,
      route: {
        name: 'bar',
        status: 200,
        loading: false
      }
    };

    it('sets route props', function () {
      var state = reduce(initial, action);
      expect(state.route.name).to.equal('bar');
      expect(state.route.status).to.equal(200);
      expect(state.route.loading).to.equal(false);
    });
  });

  describe(CHANGE_STATUS, function () {
    var action = {
      type: CHANGE_STATUS,
      status: 301
    };

    it('sets route status', function () {
      var state = reduce(initial, action);
      expect(state.route.status).to.equal(action.status);
    });
  });

  describe(CHANGE_LOADING, function () {
    var action = {
      type: CHANGE_LOADING,
      loading: true
    };

    it('sets loading', function () {
      var state = reduce(initial, action);
      expect(state.route.loading).to.equal(action.loading);
    });
  });
});