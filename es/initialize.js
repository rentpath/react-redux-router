import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import match from './match';
import { push } from './actions';
export default (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var store = _ref.store,
      location = _ref.location,
      options = _objectWithoutProperties(_ref, ["store", "location"]);

  if (!store) {
    throw new Error('Expected to receive a redux store.');
  }

  return match(_objectSpread({
    dispatch: store.dispatch,
    getState: store.getState,
    location: store.dispatch(push(location)).location
  }, options));
});