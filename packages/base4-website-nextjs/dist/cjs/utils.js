'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-9e05845b.js');
var inflected = require('inflected');
var escape = _interopDefault(require('escape-string-regexp'));
var moment = _interopDefault(require('moment'));
var objectPath = require('object-path');
var getConfig = _interopDefault(require('next/config'));

var isArray = Array.isArray;
var asArray = (function (v) {
  return isArray(v) ? v : [];
});

var isObject = (function (v) {
  return v && __chunk_1._typeof(v) === 'object';
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

var dasherize = (function (value) {
  return inflected.dasherize(inflected.underscore(value));
});

var escapeRegex = (function (v) {
  return v ? escape(v) : '';
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

var get = (function (obj, path) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return objectPath.get(obj, path, def);
});

var getAsArray = (function (obj, path) {
  return asArray(objectPath.get(obj, path, []));
});

var getAsObject = (function (obj, path) {
  return asObject(objectPath.get(obj, path, {}));
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
  var elementClass = "".concat(modelName, "__").concat(dasherize(elementTypes));
  var classes = [elementClass];
  types.forEach(function (type) {
    return classes.push("".concat(elementClass, "--").concat(dasherize(type)));
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
 * *
 * @param {string} alias The website section alias
 */


var sectionPath = (function (alias) {
  if (shouldGoToIndex(alias)) return '/';
  var path = cleanPath(alias); // Load the section route prefix from the runtime config.

  var _getConfig = getConfig(),
      publicRuntimeConfig = _getConfig.publicRuntimeConfig;

  var sectionRoutePrefix = publicRuntimeConfig.sectionRoutePrefix;
  if (!sectionRoutePrefix) return "/".concat(path);
  return "/".concat(cleanPath(sectionRoutePrefix), "/").concat(path);
});

var titleizeType = (function (type) {
  if (!type) return '';
  return type.split('-').map(function (lower) {
    return lower.replace(/^\w/, function (c) {
      return c.toUpperCase();
    });
  }).join(' ');
});

exports.asArray = asArray;
exports.asObject = asObject;
exports.cleanPath = cleanPath;
exports.componentDisplayName = componentDisplayName;
exports.createMarkup = createMarkup;
exports.dasherize = dasherize;
exports.escapeRegex = escapeRegex;
exports.extractFragmentData = extractFragmentData;
exports.extractFragmentName = extractFragmentName;
exports.formatDate = formatDate;
exports.get = get;
exports.getAsArray = getAsArray;
exports.getAsObject = getAsObject;
exports.httpErrors = httpErrors;
exports.isFunction = isFn;
exports.isObject = isObject;
exports.modelClassNames = modelClassNames;
exports.sectionPath = sectionPath;
exports.titleizeType = titleizeType;
