import _Promise from 'babel-runtime/core-js/promise';
import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

import { expect } from 'chai';
import sinon from 'sinon';
import transition from '../transition';
import { CHANGE_ROUTE, RENDER_ROUTE, STATUS_OK, STATUS_NOT_FOUND } from '../const';

describe('transition', function () {
  var location = {
    pathname: '/foo'
  };
  var components = {
    Foo: function Foo() {
      return null;
    },
    Bar: function Bar() {
      return null;
    },
    Baz: function Baz() {
      return null;
    }
  };

  it('returns a matched route', _asyncToGenerator(_regeneratorRuntime.mark(function _callee() {
    var routes, result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            routes = [{ path: '/foo', name: 'foo' }];
            _context.next = 3;
            return transition({ routes: routes, location: location });

          case 3:
            result = _context.sent;

            expect(result).to.have.deep.property('route.name', 'foo');

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('returns a default route status', _asyncToGenerator(_regeneratorRuntime.mark(function _callee2() {
    var routes, result;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            routes = [{ path: '/foo' }];
            _context2.next = 3;
            return transition({ routes: routes, location: location });

          case 3:
            result = _context2.sent;

            expect(result).to.have.deep.property('route.status', STATUS_OK);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('returns a default route', _asyncToGenerator(_regeneratorRuntime.mark(function _callee3() {
    var result;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return transition({ routes: [], location: location });

          case 2:
            result = _context3.sent;

            expect(result).to.have.deep.property('route.status', STATUS_NOT_FOUND);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('returns matched params', _asyncToGenerator(_regeneratorRuntime.mark(function _callee4() {
    var routes, result;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            routes = [{ path: '/:name' }];
            _context4.next = 3;
            return transition({ routes: routes, location: location });

          case 3:
            result = _context4.sent;

            expect(result.params).to.eql({ name: 'foo' });

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('returns a location', _asyncToGenerator(_regeneratorRuntime.mark(function _callee5() {
    var result;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return transition({ routes: [], location: location });

          case 2:
            result = _context5.sent;

            expect(result).to.have.property('location', location);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('returns the provided routes', _asyncToGenerator(_regeneratorRuntime.mark(function _callee6() {
    var routes, result;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            routes = [{ path: '/foo' }];
            _context6.next = 3;
            return transition({ routes: routes, location: location });

          case 3:
            result = _context6.sent;

            expect(result).to.have.property('routes', routes);

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('returns the provided `strict` option', _asyncToGenerator(_regeneratorRuntime.mark(function _callee7() {
    var strict, result;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            strict = false;
            _context7.next = 3;
            return transition({ routes: [], location: location, strict: strict });

          case 3:
            result = _context7.sent;

            expect(result).to.have.property('strict', strict);

          case 5:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));

  it('resolves routes', _asyncToGenerator(_regeneratorRuntime.mark(function _callee11() {
    var routes, result;
    return _regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            routes = [{
              path: '/',
              resolve: function () {
                var _ref9 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee8() {
                  return _regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          return _context8.abrupt('return', {
                            component: components.Foo
                          });

                        case 1:
                        case 'end':
                          return _context8.stop();
                      }
                    }
                  }, _callee8, _this);
                }));

                return function resolve() {
                  return _ref9.apply(this, arguments);
                };
              }(),
              routes: [{
                path: '/bar',
                resolve: function () {
                  var _ref10 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee9() {
                    return _regeneratorRuntime.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            return _context9.abrupt('return', new _Promise(function (resolve) {
                              setTimeout(function () {
                                resolve({
                                  component: components.Bar
                                });
                              }, 100);
                            }));

                          case 1:
                          case 'end':
                            return _context9.stop();
                        }
                      }
                    }, _callee9, _this);
                  }));

                  return function resolve() {
                    return _ref10.apply(this, arguments);
                  };
                }(),
                routes: [{
                  path: '/baz',
                  resolve: function () {
                    var _ref11 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee10() {
                      return _regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while (1) {
                          switch (_context10.prev = _context10.next) {
                            case 0:
                              return _context10.abrupt('return', {
                                component: components.Baz
                              });

                            case 1:
                            case 'end':
                              return _context10.stop();
                          }
                        }
                      }, _callee10, _this);
                    }));

                    return function resolve() {
                      return _ref11.apply(this, arguments);
                    };
                  }()
                }]
              }]
            }];
            _context11.next = 3;
            return transition({
              location: { pathname: '/bar/baz' },
              routes: routes
            });

          case 3:
            result = _context11.sent;

            expect(result.route.components).to.eql([components.Foo, components.Bar, components.Baz]);

          case 5:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, _this);
  })));

  it('calls a beforeRender callback', _asyncToGenerator(_regeneratorRuntime.mark(function _callee12() {
    var beforeRender;
    return _regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            beforeRender = sinon.spy();
            _context12.next = 3;
            return transition({ routes: [], location: location, beforeRender: beforeRender });

          case 3:
            expect(beforeRender.called).to.equal(true);

          case 4:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, _this);
  })));

  describe('when given a dispatch function', function () {
    describe('it dispatches router actions', function () {
      var setup = function () {
        var _ref13 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee13() {
          var routes, dispatch;
          return _regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  routes = [{ path: '/foo' }];
                  dispatch = sinon.spy();
                  _context13.next = 4;
                  return transition({ location: location, dispatch: dispatch, routes: routes });

                case 4:
                  return _context13.abrupt('return', { args: dispatch.args });

                case 5:
                case 'end':
                  return _context13.stop();
              }
            }
          }, _callee13, _this);
        }));

        return function setup() {
          return _ref13.apply(this, arguments);
        };
      }();

      it('dispatches a ' + CHANGE_ROUTE + ' action', _asyncToGenerator(_regeneratorRuntime.mark(function _callee14() {
        var _ref15, args;

        return _regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return setup();

              case 2:
                _ref15 = _context14.sent;
                args = _ref15.args;

                expect(args).to.have.deep.property('0.0.type', CHANGE_ROUTE);
                expect(args).to.have.deep.property('0.0.route').that.is.a('object');
                expect(args).to.have.deep.property('0.0.params').that.is.a('object');
                expect(args).to.have.deep.property('0.0.location').that.is.a('object');

              case 8:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, _this);
      })));

      it('dispatches a ' + RENDER_ROUTE + ' action', _asyncToGenerator(_regeneratorRuntime.mark(function _callee15() {
        var _ref17, args;

        return _regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.next = 2;
                return setup();

              case 2:
                _ref17 = _context15.sent;
                args = _ref17.args;

                expect(args).to.have.deep.property('1.0.type', RENDER_ROUTE);
                expect(args).to.have.deep.property('1.0.route').that.is.a('object');
                expect(args).to.have.deep.property('1.0.params').that.is.a('object');
                expect(args).to.have.deep.property('1.0.location').that.is.a('object');

              case 8:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, _this);
      })));
    });

    it('dispatches pojo route actions', _asyncToGenerator(_regeneratorRuntime.mark(function _callee16() {
      var action, dispatch, routes;
      return _regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              action = { type: 'FOO' };
              dispatch = sinon.spy();
              routes = [{ path: '/foo', action: action }];
              _context16.next = 5;
              return transition({ location: location, routes: routes, dispatch: dispatch });

            case 5:
              expect(dispatch).to.have.been.calledWith(action);

            case 6:
            case 'end':
              return _context16.stop();
          }
        }
      }, _callee16, _this);
    })));

    it('dispatches function route actions', _asyncToGenerator(_regeneratorRuntime.mark(function _callee17() {
      var action, dispatch, routes;
      return _regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              action = function action() {
                return { type: 'BAR' };
              };

              dispatch = sinon.spy();
              routes = [{ path: '/foo', action: action }];
              _context17.next = 5;
              return transition({ location: location, routes: routes, dispatch: dispatch });

            case 5:
              expect(dispatch).to.have.been.calledWith(action());

            case 6:
            case 'end':
              return _context17.stop();
          }
        }
      }, _callee17, _this);
    })));

    it('dispatches route actions loaded via resolver', _asyncToGenerator(_regeneratorRuntime.mark(function _callee19() {
      var dispatch, action, routes;
      return _regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              dispatch = sinon.spy();
              action = { type: 'FOO' };
              routes = [{
                path: '/foo',
                resolve: function () {
                  var _ref21 = _asyncToGenerator(_regeneratorRuntime.mark(function _callee18() {
                    return _regeneratorRuntime.wrap(function _callee18$(_context18) {
                      while (1) {
                        switch (_context18.prev = _context18.next) {
                          case 0:
                            return _context18.abrupt('return', { action: action });

                          case 1:
                          case 'end':
                            return _context18.stop();
                        }
                      }
                    }, _callee18, _this);
                  }));

                  return function resolve() {
                    return _ref21.apply(this, arguments);
                  };
                }()
              }];
              _context19.next = 5;
              return transition({ location: location, routes: routes, dispatch: dispatch });

            case 5:
              expect(dispatch).to.have.been.calledWith(action);

            case 6:
            case 'end':
              return _context19.stop();
          }
        }
      }, _callee19, _this);
    })));
  });
});