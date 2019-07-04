import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import parse from 'parse-location';
import transition from './transition';
export default (function (_ref) {
  return new Promise(function ($return, $error) {
    var location = _ref.location,
        options = _objectWithoutProperties(_ref, ["location"]);

    return $return(transition(_objectSpread({}, options, {
      location: parse(location)
    })));
  });
});