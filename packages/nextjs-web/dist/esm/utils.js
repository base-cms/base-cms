import { a as _typeof } from './chunk-3be546a6.js';
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

var _get = (function (obj, path) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return get(obj, path, def);
});

var _getAsArray = (function (obj, path) {
  return asArray(get(obj, path, []));
});

var _getAsObject = (function (obj, path) {
  return asObject(get(obj, path, {}));
});

var isFunction = (function (v) {
  return typeof v === 'function';
});

export { asArray, asObject, cleanPath, componentDisplayName, createMarkup, _get as get, _getAsArray as getAsArray, _getAsObject as getAsObject, isFunction, isObject };
