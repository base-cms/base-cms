import { a as _typeof } from './chunk-1a4eb17c.js';
import { underscore, dasherize } from 'inflected';
import moment from 'moment';
import { get } from 'object-path';

var isArray = Array.isArray;
var asArray = (function (v) {
  return isArray(v) ? v : [];
});

var isObject = (function (v) {
  return v && _typeof(v) === 'object';
});

var asObject = (function (v) {
  return isObject(v) ? v : {};
});

var cleanPath = (function (path) {
  if (!path) return '';
  var trimmed = String(path).trim();
  if (!trimmed.length) return '';
  return trimmed.replace(/^\/+/, '').replace(/\/+$/, '');
});

var componentDisplayName = (function (Comp) {
  if (typeof Comp === 'string') return Comp;
  return Comp.displayName || Comp.name || 'Unknown';
});

var createMarkup = (function (html) {
  return {
    __html: html
  };
});

var dasherize$1 = (function (value) {
  return dasherize(underscore(value));
});

var extractFragmentName = (function (fragment) {
  var pattern = /fragment (.*) on/;
  if (typeof fragment === 'string') return fragment.match(pattern)[1];

  if (fragment && fragment.kind && fragment.kind === 'Document') {
    return fragment.loc.source.body.match(pattern)[1];
  }

  return null;
});

var extractFragmentData = (function (_ref) {
  var fragment = _ref.fragment;
  var spreadFragmentName = '';
  var processedFragment = '';

  if (fragment) {
    var fragmentName = extractFragmentName(fragment);
    if (!fragmentName) throw new Error('Unable to extract a fragment name.');
    processedFragment = fragment;
    spreadFragmentName = "...".concat(fragmentName);
  }

  return {
    processedFragment: processedFragment,
    spreadFragmentName: spreadFragmentName
  };
});

var formatDate = (function (value, format) {
  if (!value) return '';
  var date = moment(value);
  return date.isValid() ? date.format(format) : '';
});

var getAsArray = (function (obj, path) {
  return asArray(get(obj, path, []));
});

var getAsObject = (function (obj, path) {
  return asObject(get(obj, path, {}));
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

var isFn = (function (v) {
  return typeof v === 'function';
});

var modelClassNames = (function (modelName, path) {
  var types = String(path).split('.');
  var elementTypes = types.shift();
  var elementClass = "".concat(modelName, "__").concat(dasherize$1(elementTypes));
  var classes = [elementClass];
  types.forEach(function (type) {
    return classes.push("".concat(elementClass, "--").concat(dasherize$1(type)));
  });
  return classes;
});

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

var titleizeType = (function (type) {
  if (!type) return '';
  return type.split('-').map(function (lower) {
    return lower.replace(/^\w/, function (c) {
      return c.toUpperCase();
    });
  }).join(' ');
});

export { asArray, asObject, cleanPath, componentDisplayName, createMarkup, dasherize$1 as dasherize, extractFragmentData, extractFragmentName, formatDate, getAsArray, getAsObject, httpErrors, isFn as isFunction, isObject, modelClassNames, sectionPath, titleizeType };
