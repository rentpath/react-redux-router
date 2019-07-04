"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _parseLocation = _interopRequireDefault(require("parse-location"));

var _actions = require("../actions");

var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

var InnerLink =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(InnerLink, _PureComponent);

  function InnerLink(props) {
    var _this;

    (0, _classCallCheck2.default)(this, InnerLink);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InnerLink).call(this, props));
    _this.handleClick = _this.handleClick.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(InnerLink, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      if (!event.defaultPrevented && event.button === 0 && !this.props.target && !isModifiedEvent(event) && this.props.store) {
        var dispatch = this.props.store.dispatch;
        event.preventDefault();

        if (this.props.replace) {
          dispatch((0, _actions.replace)(this.props.to));
        } else {
          dispatch((0, _actions.push)(this.props.to));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          to = _this$props.to,
          repl = _this$props.replace,
          dispatch = _this$props.dispatch,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["to", "replace", "dispatch"]);
      var href = typeof to === 'string' ? to : (0, _parseLocation.default)(to).href;
      return _react.default.createElement("a", (0, _extends2.default)({}, props, {
        href: href,
        onClick: this.handleClick
      }));
    }
  }]);
  return InnerLink;
}(_react.PureComponent);

InnerLink.propTypes = {
  onClick: _propTypes.default.func,
  replace: _propTypes.default.bool,
  store: _propTypes.default.object,
  target: _propTypes.default.string,
  to: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]).isRequired
};
InnerLink.defaultProps = {
  replace: false
};

var Link = function Link(outerProps) {
  return _react.default.createElement(_reactRedux.ReactReduxContext.Consumer, null, function (_ref) {
    var store = _ref.store;
    return _react.default.createElement(InnerLink, (0, _extends2.default)({}, outerProps, {
      store: store
    }));
  });
};

var _default = Link;
exports.default = _default;