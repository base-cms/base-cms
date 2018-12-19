'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_2 = require('./chunk-79f77106.js');
var objectPath = require('object-path');

var isArray = Array.isArray;
var asArray = (function (v) {
  return isArray(v) ? v : [];
});

var isObject = (function (v) {
  return v && __chunk_2._typeof(v) === 'object';
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

var isFunction = (function (v) {
  return typeof v === 'function';
});

exports.asArray = asArray;
exports.asObject = asObject;
exports.cleanPath = cleanPath;
exports.componentDisplayName = componentDisplayName;
exports.createMarkup = createMarkup;
exports.get = _get;
exports.getAsArray = _getAsArray;
exports.getAsObject = _getAsObject;
exports.isFunction = isFunction;
exports.isObject = isObject;
