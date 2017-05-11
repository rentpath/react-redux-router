'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _parseLocation = require('parse-location');

var _parseLocation2 = _interopRequireDefault(_parseLocation);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

var Link = function (_PureComponent) {
  (0, _inherits3.default)(Link, _PureComponent);

  function Link(props) {
    (0, _classCallCheck3.default)(this, Link);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Link, [{
    key: 'handleClick',
    value: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      if (!event.defaultPrevented && event.button === 0 && !this.props.target && !isModifiedEvent(event) && this.context.store) {
        event.preventDefault();
        var dispatch = this.context.store.dispatch;


        if (this.props.replace) {
          dispatch((0, _actions.replace)(this.props.to));
        } else {
          dispatch((0, _actions.push)(this.props.to));
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          to = _props.to,
          repl = _props.replace,
          dispatch = _props.dispatch,
          props = (0, _objectWithoutProperties3.default)(_props, ['to', 'replace', 'dispatch']);

      var location = (0, _parseLocation2.default)(to);

      return _react2.default.createElement('a', (0, _extends3.default)({}, props, {
        href: location.href,
        onClick: this.handleClick
      }));
    }
  }]);
  return Link;
}(_react.PureComponent);

Link.contextTypes = {
  store: _propTypes2.default.object
};
Link.propTypes = {
  to: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  replace: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  target: _propTypes2.default.string
};
Link.defaultProps = {
  replace: false
};
exports.default = Link;