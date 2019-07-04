import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _transition from '../transition';
import { initRouter, pop } from '../actions';

var Router =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Router, _PureComponent);

  function Router(props) {
    var _this;

    _classCallCheck(this, Router);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Router).call(this, props));
    props.dispatch(initRouter(_assertThisInitialized(_this)));
    _this.route = _objectSpread({}, props.route, props.router.route);

    if (props.initialLocation) {
      props.dispatch(pop(props.initialLocation));
    }

    return _this;
  }

  _createClass(Router, [{
    key: "componentWillUpdate",
    value: function componentWillUpdate(props) {
      if (props.router.route !== this.props.router.route) {
        this.route = _objectSpread({}, this.route, props.router.route);
      } else if (props.route !== this.props.route) {
        this.route = _objectSpread({}, this.route, props.route);
      }
    }
  }, {
    key: "transition",
    value: function transition(location, status) {
      var _this2 = this;

      _transition({
        location: location,
        status: status,
        getState: this.props.getState,
        strict: this.props.strict,
        routes: this.props.routes,
        dispatch: this.props.dispatch,
        beforeRender: function beforeRender(result) {
          _this2.route = _objectSpread({}, result.route, _this2.props.router.route);

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

      var props = _objectSpread({}, router, {
        route: this.route
      });

      if (render) {
        return render(props);
      }

      if (!this.route.components) {
        return null;
      }

      return this.route.components.reduceRight(function (children, Route) {
        return React.createElement(Route, _extends({}, props, {
          children: children
        }));
      }, null);
    }
  }]);

  return Router;
}(PureComponent);

Router.propTypes = {
  router: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  render: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  initialLocation: PropTypes.object,
  strict: PropTypes.bool,
  onChange: PropTypes.func,
  route: PropTypes.shape({
    components: PropTypes.array
  })
};
Router.defaultProps = {
  route: {}
};
export default connect(function (state, _ref) {
  var selectState = _ref.selectState;
  var router = selectState ? selectState(state) : state.router;

  if (!router) {
    throw new Error('<Router>: expected to find router state using key `router`.');
  }

  return {
    router: router
  };
})(Router);