import { expect } from 'chai';
import { POP, PUSH, REPLACE, GO, GO_BACK, GO_FORWARD, CHANGE_ROUTE, RENDER_ROUTE, CHANGE_STATUS, CHANGE_LOADING, CHANGE_LOCATION } from '../const';
import { pop, push, replace, go, goBack, goForward, changeRoute, renderRoute, changeStatus, changeLoading, changeLocation } from '../actions';

describe('actions', function () {
  describe('pop', function () {
    it('has a type', function () {
      expect(pop('/foo')).to.have.property('type', CHANGE_LOCATION);
    });

    it('has a method', function () {
      expect(pop('/foo')).to.have.property('method', POP);
    });

    it('has a location', function () {
      expect(pop('/foo')).to.have.property('location').that.is.a('object');
    });
  });

  describe('push', function () {
    it('has a type', function () {
      expect(push('/foo')).to.have.property('type', CHANGE_LOCATION);
    });

    it('has a method', function () {
      expect(push('/foo')).to.have.property('method', PUSH);
    });

    it('has a location', function () {
      expect(push('/foo')).to.have.property('location').that.is.a('object');
    });

    it('can have a status', function () {
      expect(push('/foo', 200)).to.have.property('status', 200);
    });
  });

  describe('replace', function () {
    it('has a type', function () {
      expect(replace('/foo')).to.have.property('type', CHANGE_LOCATION);
    });

    it('has a method', function () {
      expect(replace('/foo')).to.have.property('method', REPLACE);
    });

    it('has a location', function () {
      expect(replace('/foo')).to.have.property('location').that.is.a('object');
    });

    it('can have a status', function () {
      expect(replace('/foo', 301)).to.have.property('status', 301);
    });
  });

  describe('go', function () {
    it('has a type', function () {
      expect(go()).to.have.property('type', GO);
    });

    it('has a index', function () {
      expect(go(-1)).to.have.property('index', -1);
    });
  });

  describe('goBack', function () {
    it('has a type', function () {
      expect(goBack()).to.have.property('type', GO_BACK);
    });
  });

  describe('goForward', function () {
    it('has a type', function () {
      expect(goForward()).to.have.property('type', GO_FORWARD);
    });
  });

  describe('changeLocation', function () {
    it('has a type', function () {
      expect(changeLocation().type).to.equal(CHANGE_LOCATION);
    });

    it('has a location', function () {
      var result = changeLocation({ location: '/foo' });
      expect(result.location).to.be.a('object');
    });
  });

  describe('changeRoute', function () {
    it('has a type', function () {
      expect(changeRoute()).to.have.property('type', CHANGE_ROUTE);
    });

    it('has a route', function () {
      var route = {};
      expect(changeRoute({ route: route })).to.have.property('route', route);
    });
  });

  describe('renderRoute', function () {
    it('has a type', function () {
      expect(renderRoute()).to.have.property('type', RENDER_ROUTE);
    });

    it('has a route', function () {
      var route = {};
      expect(renderRoute({ route: route })).to.have.property('route', route);
    });
  });

  describe('changeStatus', function () {
    it('has a type', function () {
      expect(changeStatus()).to.have.property('type', CHANGE_STATUS);
    });

    it('has a status', function () {
      expect(changeStatus(200)).to.have.property('status', 200);
    });
  });

  describe('changeLoading', function () {
    it('has a type', function () {
      expect(changeLoading()).to.have.property('type', CHANGE_LOADING);
    });

    it('has a loading flag', function () {
      expect(changeLoading(true)).to.have.property('loading', true);
    });
  });
});