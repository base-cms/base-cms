'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-cd896063.js');
var objectPath = require('object-path');

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

var _get = (function (obj, path) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return objectPath.get(obj, path, def);
});

var _getAsArray = (function (obj, path) {
  return asArray(objectPath.get(obj, path, []));
});

var _getAsObject = (function (obj, path) {
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

exports.asArray = asArray;
exports.asObject = asObject;
exports.cleanPath = cleanPath;
exports.componentDisplayName = componentDisplayName;
exports.createMarkup = createMarkup;
exports.extractFragmentData = extractFragmentData;
exports.extractFragmentName = extractFragmentName;
exports.get = _get;
exports.getAsArray = _getAsArray;
exports.getAsObject = _getAsObject;
exports.httpErrors = httpErrors;
exports.isFunction = isFn;
exports.isObject = isObject;
