'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-c2e7f00c.js');
var __chunk_2 = require('./chunk-9b172cca.js');

var createMarkup = (function (html) {
  return {
    __html: html
  };
});

/**
 * Determines if an alias should go to the index/home page.
 *
 * @param {string} alias
 */

var shouldGoToIndex = function shouldGoToIndex(alias) {
  var path = __chunk_1.cleanPath(alias);
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
  var path = __chunk_1.cleanPath(alias);
  if (!routePrefix) return "/".concat(path);
  return "/".concat(__chunk_1.cleanPath(routePrefix), "/").concat(path);
});

exports.cleanPath = __chunk_1.cleanPath;
exports.componentDisplayName = __chunk_2.displayName;
exports.httpErrors = __chunk_2.httpErrors;
exports.createMarkup = createMarkup;
exports.sectionPath = sectionPath;
