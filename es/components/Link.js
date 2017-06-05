import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import parseLocation from 'parse-location';
import { push, replace } from '../actions';

var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

var Link = function (_PureComponent) {
  _inherits(Link, _PureComponent);

  function Link(props) {
    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, (Link.__proto__ || _Object$getPrototypeOf(Link)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Link, [{
    key: 'handleClick',
    value: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      if (!event.defaultPrevented && event.button === 0 && !this.props.target && !isModifiedEvent(event) && this.context.store) {
        event.preventDefault();
        var dispatch = this.context.store.dispatch;


        if (this.props.replace) {
          dispatch(replace(this.props.to));
        } else {
          dispatch(push(this.props.to));
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
          props = _objectWithoutProperties(_props, ['to', 'replace', 'dispatch']);

      var href = typeof to === 'string' ? to : parseLocation(to).href;

      return React.createElement('a', _extends({}, props, {
        href: href,
        onClick: this.handleClick
      }));
    }
  }]);

  return Link;
}(PureComponent);

Link.contextTypes = {
  store: PropTypes.object
};
Link.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  replace: PropTypes.bool,
  onClick: PropTypes.func,
  target: PropTypes.string
};
Link.defaultProps = {
  replace: false
};
export default Link;