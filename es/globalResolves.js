var resolveOnAll = [];
export var getGlobalResolves = function getGlobalResolves() {
  return [].concat(resolveOnAll);
};
export default (function (resolveFunc) {
  return resolveOnAll.push(resolveFunc);
});