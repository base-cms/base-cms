import { i as _typeof } from './chunk-02337cfc.js';
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
  return get(obj, path, def);
});

var _getAsArray = (function (obj, path) {
  return asArray(get(obj, path, []));
});

var _getAsObject = (function (obj, path) {
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

export { asArray, asObject, cleanPath, componentDisplayName, createMarkup, extractFragmentData, extractFragmentName, _get as get, _getAsArray as getAsArray, _getAsObject as getAsObject, httpErrors, isFn as isFunction, isObject };
