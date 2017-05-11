'use strict';

var _chai = require('chai');

var _const = require('../const');

var _actions = require('../actions');

describe('actions', function () {
  describe('pop', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.pop)('/foo')).to.have.property('type', _const.CHANGE_LOCATION);
    });

    it('has a method', function () {
      (0, _chai.expect)((0, _actions.pop)('/foo')).to.have.property('method', _const.POP);
    });

    it('has a location', function () {
      (0, _chai.expect)((0, _actions.pop)('/foo')).to.have.property('location').that.is.a('object');
    });
  });

  describe('push', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.push)('/foo')).to.have.property('type', _const.CHANGE_LOCATION);
    });

    it('has a method', function () {
      (0, _chai.expect)((0, _actions.push)('/foo')).to.have.property('method', _const.PUSH);
    });

    it('has a location', function () {
      (0, _chai.expect)((0, _actions.push)('/foo')).to.have.property('location').that.is.a('object');
    });

    it('can have a status', function () {
      (0, _chai.expect)((0, _actions.push)('/foo', 200)).to.have.property('status', 200);
    });
  });

  describe('replace', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.replace)('/foo')).to.have.property('type', _const.CHANGE_LOCATION);
    });

    it('has a method', function () {
      (0, _chai.expect)((0, _actions.replace)('/foo')).to.have.property('method', _const.REPLACE);
    });

    it('has a location', function () {
      (0, _chai.expect)((0, _actions.replace)('/foo')).to.have.property('location').that.is.a('object');
    });

    it('can have a status', function () {
      (0, _chai.expect)((0, _actions.replace)('/foo', 301)).to.have.property('status', 301);
    });
  });

  describe('go', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.go)()).to.have.property('type', _const.GO);
    });

    it('has a index', function () {
      (0, _chai.expect)((0, _actions.go)(-1)).to.have.property('index', -1);
    });
  });

  describe('goBack', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.goBack)()).to.have.property('type', _const.GO_BACK);
    });
  });

  describe('goForward', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.goForward)()).to.have.property('type', _const.GO_FORWARD);
    });
  });

  describe('changeLocation', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.changeLocation)().type).to.equal(_const.CHANGE_LOCATION);
    });

    it('has a location', function () {
      var result = (0, _actions.changeLocation)({ location: '/foo' });
      (0, _chai.expect)(result.location).to.be.a('object');
    });
  });

  describe('changeRoute', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.changeRoute)()).to.have.property('type', _const.CHANGE_ROUTE);
    });

    it('has a route', function () {
      var route = {};
      (0, _chai.expect)((0, _actions.changeRoute)({ route: route })).to.have.property('route', route);
    });
  });

  describe('renderRoute', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.renderRoute)()).to.have.property('type', _const.RENDER_ROUTE);
    });

    it('has a route', function () {
      var route = {};
      (0, _chai.expect)((0, _actions.renderRoute)({ route: route })).to.have.property('route', route);
    });
  });

  describe('changeStatus', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.changeStatus)()).to.have.property('type', _const.CHANGE_STATUS);
    });

    it('has a status', function () {
      (0, _chai.expect)((0, _actions.changeStatus)(200)).to.have.property('status', 200);
    });
  });

  describe('changeLoading', function () {
    it('has a type', function () {
      (0, _chai.expect)((0, _actions.changeLoading)()).to.have.property('type', _const.CHANGE_LOADING);
    });

    it('has a loading flag', function () {
      (0, _chai.expect)((0, _actions.changeLoading)(true)).to.have.property('loading', true);
    });
  });
});