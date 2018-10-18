import { a as cleanPath } from './chunk-5198f64a.js';

var displayName = (function (Comp) {
  if (typeof Comp === 'string') return Comp;
  return Comp.displayName || Comp.name || 'Unknown';
});

var httpErrors = {
  notFound: function notFound() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'No record found.';
    var e = new Error(message);
    e.code = 'ENOENT';
    e.statusCode = 404;
    return e;
  }
};

/**
 * Determines if an alias should go to the index/home page.
 *
 * @param {string} alias
 */

var shouldGoToIndex = function shouldGoToIndex(alias) {
  var path = cleanPath(alias);
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


var sectionPath = (function (alias) {
  var routePrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'section';
  if (shouldGoToIndex(alias)) return '/';
  var path = cleanPath(alias);
  if (!routePrefix) return "/".concat(path);
  return "/".concat(cleanPath(routePrefix), "/").concat(path);
});

export { displayName as a, httpErrors as b, sectionPath as c };
