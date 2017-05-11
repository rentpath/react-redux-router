'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

    _this.current = {
      route: props.route,
      params: props.params
    };
    props.dispatch((0, _actions.initRouter)(_this));
    if (props.initialLocation) {
      props.dispatch((0, _actions.pop)(props.initialLocation));
    }
    return _this;
  }

  (0, _createClass3.default)(Router, [{
    key: 'transition',
    value: function transition(location) {
      var _this2 = this;

      (0, _transition3.default)({
        location: location,
        strict: this.props.strict,
        routes: this.props.routes,
        dispatch: this.props.dispatch,
        beforeRender: function beforeRender(_ref) {
          var route = _ref.route,
              params = _ref.params;

          _this2.current = { route: route, params: params };
          if (_this2.props.onChange) {
            _this2.props.onChange({ route: route, params: params, location: location });
          }
        }
      });
    }
  }, {
    key: 'renderRoute',
    value: function renderRoute(route, params) {
      var _props = this.props,
          location = _props.location,
          loading = _props.loading;
      var components = route.components,
          props = (0, _objectWithoutProperties3.default)(route, ['components']);


      props.loading = loading;

      return components.reduceRight(function (children, Route) {
        return _react2.default.createElement(Route, {
          route: props,
          params: params,
          location: location,
          children: children
        });
      }, null);
    }
  }, {
    key: 'render',
    value: function render() {
      var _current = this.current,
          route = _current.route,
          params = _current.params;

      return route ? this.renderRoute(route, params) : null;
    }
  }]);
  return Router;
}(_react.PureComponent);

Router.propTypes = {
  routes: _propTypes2.default.array.isRequired,
  loading: _propTypes2.default.bool.isRequired,
  location: _propTypes2.default.object.isRequired,
  dispatch: _propTypes2.default.func.isRequired,
  initialLocation: _propTypes2.default.object,
  strict: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  params: _propTypes2.default.object,
  route: _propTypes2.default.shape({
    components: _propTypes2.default.array
  })
};
exports.default = (0, _reactRedux.connect)(function (state, _ref2) {
  var selectState = _ref2.selectState;

  var router = selectState ? selectState(state) : state.router;
  if (!router) {
    throw new Error('<Router>: expected to find router state using key `router`.');
  }
  return {
    loading: router.route.loading,
    location: router.location
  };
})(Router);