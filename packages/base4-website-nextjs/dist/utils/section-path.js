"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cleanPath = _interopRequireDefault(require("./clean-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determines if an alias should go to the index/home page.
 *
 * @param {string} alias
 */
var shouldGoToIndex = function shouldGoToIndex(alias) {
  var path = (0, _cleanPath.default)(alias);
  if (path === 'home' || path === '') return true;
  return false;
};
/**
 * Generates the website section route name (as used by `next-routes`).
 *
 * By default, if the section alias were `tactical/firearms`, this method
 * would generate `/section/tactical/firearms`.
 *
 * The `routePrefix` (the default is 'section') can also be overriden by passing a different value.
 * Keep in mind, if this is done, the root routes.js file will need modification.
 *
 * @param {string} alias The website section alias
 * @param {string} [routePrefix=section] The section base path.
 */


var _default = function _default(alias) {
  var routePrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'section';
  if (shouldGoToIndex(alias)) return '/';
  var path = (0, _cleanPath.default)(alias);
  if (!routePrefix) return "/".concat(path);
  return "/".concat((0, _cleanPath.default)(routePrefix), "/").concat(path);
};

exports.default = _default;