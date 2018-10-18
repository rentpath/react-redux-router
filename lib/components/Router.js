'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _transition2 = require('../transition');

var _transition3 = _interopRequireDefault(_transition2);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = function (_PureComponent) {
  (0, _inherits3.default)(Router, _PureComponent);

  function Router(props) {
    (0, _classCallCheck3.default)(this, Router);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Router.__proto__ || (0, _getPrototypeOf2.default)(Router)).call(this, props));

    props.dispatch((0, _actions.initRouter)(_this));
    _this.route = (0, _extends3.default)({}, props.route, props.router.route);
    if (props.initialLocation) {
      props.dispatch((0, _actions.pop)(props.initialLocation));
    }
    return _this;
  }

  (0, _createClass3.default)(Router, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(props) {
      if (props.router.route !== this.props.router.route) {
        this.route = (0, _extends3.default)({}, this.route, props.router.route);
      } else if (props.route !== this.props.route) {
        this.route = (0, _extends3.default)({}, this.route, props.route);
      }
    }
  }, {
    key: 'transition',
    value: function transition(location, status) {
      var _this2 = this;

      (0, _transition3.default)({
        location: location,
        status: status,
        getState: this.props.getState,
        strict: this.props.strict,
        routes: this.props.routes,
        dispatch: this.props.dispatch,
        beforeRender: function beforeRender(result) {
          _this2.route = (0, _extends3.default)({}, result.route, _this2.props.router.route);
          if (_this2.props.onChange) {
            _this2.props.onChange({
              route: result.route,
              params: result.params,
              location: location
            });
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          router = _props.router,
          render = _props.render;


      var props = (0, _extends3.default)({}, router, {
        route: this.route
      });

      if (render) {
        return render(props);
      }

      if (!this.route.components) {
        return null;
      }

      return this.route.components.reduceRight(function (children, Route) {
        return _react2.default.createElement(Route, (0, _extends3.default)({}, props, { children: children }));
      }, null);
    }
  }]);
  return Router;
}(_react.PureComponent);

Router.propTypes = {
  router: _propTypes2.default.object.isRequired,
  routes: _propTypes2.default.array.isRequired,
  render: _propTypes2.default.func,
  dispatch: _propTypes2.default.func.isRequired,
  getState: _propTypes2.default.func.isRequired,
  initialLocation: _propTypes2.default.object,
  strict: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  route: _propTypes2.default.shape({
    components: _propTypes2.default.array
  })
};
Router.defaultProps = {
  route: {}
};
exports.default = (0, _reactRedux.connect)(function (state, _ref) {
  var selectState = _ref.selectState;

  var router = selectState ? selectState(state) : state.router;
  if (!router) {
    throw new Error('<Router>: expected to find router state using key `router`.');
  }
  return {
    router: router
  };
})(Router);