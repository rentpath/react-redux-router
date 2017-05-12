'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _chai = require('chai');

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _const = require('../const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('reducer', function () {
  describe(_const.CHANGE_LOCATION, function () {
    var action = {
      type: _const.CHANGE_LOCATION,
      location: {
        pathname: '/foo'
      }
    };

    it('sets location', function () {
      var state = (0, _reducer2.default)(_reducer.initial, action);
      (0, _chai.expect)(state.location.pathname).to.equal('/foo');
    });

    it('carries over a host value', function () {
      var state = (0, _reducer2.default)((0, _extends3.default)({}, _reducer.initial, { location: { host: 'foo.com' } }), action);
      (0, _chai.expect)(state.location.host).to.equal('foo.com');
    });

    it('carries over a port value', function () {
      var state = (0, _reducer2.default)((0, _extends3.default)({}, _reducer.initial, { location: { port: '80' } }), action);
      (0, _chai.expect)(state.location.port).to.equal('80');
    });

    it('carries over a hostname value', function () {
      var state = (0, _reducer2.default)((0, _extends3.default)({}, _reducer.initial, { location: { hostname: 'foo.com' } }), action);
      (0, _chai.expect)(state.location.hostname).to.equal('foo.com');
    });

    it('carries over a protocol value', function () {
      var state = (0, _reducer2.default)((0, _extends3.default)({}, _reducer.initial, { location: { protocol: 'http:' } }), action);
      (0, _chai.expect)(state.location.protocol).to.equal('http:');
    });

    it('sets route status when provied', function () {
      var status = 301;
      var state = (0, _reducer2.default)(_reducer.initial, (0, _extends3.default)({}, action, { status: status }));
      (0, _chai.expect)(state.route.status).to.equal(status);
    });

    it('only sets route status when provided', function () {
      var status = 301;
      var state = (0, _reducer2.default)((0, _extends3.default)({}, _reducer.initial, { route: (0, _extends3.default)({}, _reducer.initial.route, { status: status }) }), action);
      (0, _chai.expect)(state.route.status).to.equal(status);
    });
  });

  describe(_const.CHANGE_ROUTE, function () {
    var action = {
      type: _const.CHANGE_ROUTE,
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
      var state = (0, _reducer2.default)(_reducer.initial, action);
      (0, _chai.expect)(state.route.name).to.equal('foo');
      (0, _chai.expect)(state.route.status).to.equal(200);
      (0, _chai.expect)(state.route.loading).to.equal(true);
    });

    it('sets params', function () {
      var state = (0, _reducer2.default)(_reducer.initial, action);
      (0, _chai.expect)(state.params).to.eql(action.params);
    });
  });

  describe(_const.RENDER_ROUTE, function () {
    var action = {
      type: _const.RENDER_ROUTE,
      route: {
        name: 'bar',
        status: 200,
        loading: false
      }
    };

    it('sets route props', function () {
      var state = (0, _reducer2.default)(_reducer.initial, action);
      (0, _chai.expect)(state.route.name).to.equal('bar');
      (0, _chai.expect)(state.route.status).to.equal(200);
      (0, _chai.expect)(state.route.loading).to.equal(false);
    });
  });

  describe(_const.CHANGE_STATUS, function () {
    var action = {
      type: _const.CHANGE_STATUS,
      status: 301
    };

    it('sets route status', function () {
      var state = (0, _reducer2.default)(_reducer.initial, action);
      (0, _chai.expect)(state.route.status).to.equal(action.status);
    });
  });

  describe(_const.CHANGE_LOADING, function () {
    var action = {
      type: _const.CHANGE_LOADING,
      loading: true
    };

    it('sets loading', function () {
      var state = (0, _reducer2.default)(_reducer.initial, action);
      (0, _chai.expect)(state.route.loading).to.equal(action.loading);
    });
  });
});