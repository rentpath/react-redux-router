import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux';
import parseLocation from 'parse-location';
import { push, replace } from '../actions';

var isModifiedEvent = function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

var InnerLink =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(InnerLink, _PureComponent);

  function InnerLink(props) {
    var _this;

    _classCallCheck(this, InnerLink);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InnerLink).call(this, props));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(InnerLink, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (this.props.onClick) {
        this.props.onClick(event);
      }

      if (!event.defaultPrevented && event.button === 0 && !this.props.target && !isModifiedEvent(event) && this.props.store) {
        var dispatch = this.props.store.dispatch;
        event.preventDefault();

        if (this.props.replace) {
          dispatch(replace(this.props.to));
        } else {
          dispatch(push(this.props.to));
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
          props = _objectWithoutProperties(_this$props, ["to", "replace", "dispatch"]);

      var href = typeof to === 'string' ? to : parseLocation(to).href;
      return React.createElement("a", _extends({}, props, {
        href: href,
        onClick: this.handleClick
      }));
    }
  }]);

  return InnerLink;
}(PureComponent);

InnerLink.propTypes = {
  onClick: PropTypes.func,
  replace: PropTypes.bool,
  store: PropTypes.object,
  target: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
};
InnerLink.defaultProps = {
  replace: false
};

var Link = function Link(outerProps) {
  return React.createElement(ReactReduxContext.Consumer, null, function (_ref) {
    var store = _ref.store;
    return React.createElement(InnerLink, _extends({}, outerProps, {
      store: store
    }));
  });
};

export default Link;