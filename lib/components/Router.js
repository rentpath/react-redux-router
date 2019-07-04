"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _transition2 = _interopRequireDefault(require("../transition"));

var _actions = require("../actions");

var Router =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Router, _PureComponent);

  function Router(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Router);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Router).call(this, props));
    props.dispatch((0, _actions.initRouter)((0, _assertThisInitialized2.default)(_this)));
    _this.route = (0, _objectSpread2.default)({}, props.route, props.router.route);

    if (props.initialLocation) {
      props.dispatch((0, _actions.pop)(props.initialLocation));
    }

    return _this;
  }

  (0, _createClass2.default)(Router, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(props) {
      if (props.router.route !== this.props.router.route) {
        this.route = (0, _objectSpread2.default)({}, this.route, props.router.route);
      } else if (props.route !== this.props.route) {
        this.route = (0, _objectSpread2.default)({}, this.route, props.route);
      }
    }
  }, {
    key: "transition",
    value: function transition(location, status) {
      var _this2 = this;

      (0, _transition2.default)({
        location: location,
        status: status,
        getState: this.props.getState,
        strict: this.props.strict,
        routes: this.props.routes,
        dispatch: this.props.dispatch,
        beforeRender: function beforeRender(result) {
          _this2.route = (0, _objectSpread2.default)({}, result.route, _this2.props.router.route);

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
    key: "render",
    value: function render() {
      var _this$props = this.props,
          router = _this$props.router,
          render = _this$props.render;
      var props = (0, _objectSpread2.default)({}, router, {
        route: this.route
      });

      if (render) {
        return render(props);
      }

      if (!this.route.components) {
        return null;
      }

      return this.route.components.reduceRight(function (children, Route) {
        return _react.default.createElement(Route, (0, _extends2.default)({}, props, {
          children: children
        }));
      }, null);
    }
  }]);
  return Router;
}(_react.PureComponent);

Router.propTypes = {
  router: _propTypes.default.object.isRequired,
  routes: _propTypes.default.array.isRequired,
  render: _propTypes.default.func,
  dispatch: _propTypes.default.func.isRequired,
  getState: _propTypes.default.func.isRequired,
  initialLocation: _propTypes.default.object,
  strict: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  route: _propTypes.default.shape({
    components: _propTypes.default.array
  })
};
Router.defaultProps = {
  route: {}
};

var _default = (0, _reactRedux.connect)(function (state, _ref) {
  var selectState = _ref.selectState;
  var router = selectState ? selectState(state) : state.router;

  if (!router) {
    throw new Error('<Router>: expected to find router state using key `router`.');
  }

  return {
    router: router
  };
})(Router);

exports.default = _default;