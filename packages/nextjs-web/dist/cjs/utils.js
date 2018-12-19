'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_2 = require('./chunk-79f77106.js');

var componentDisplayName = (function (Comp) {
  if (typeof Comp === 'string') return Comp;
  return Comp.displayName || Comp.name || 'Unknown';
});

var isFunction = (function (v) {
  return typeof v === 'function';
});

var isObject = (function (v) {
  return v && __chunk_2._typeof(v) === 'object';
});

exports.componentDisplayName = componentDisplayName;
exports.isFunction = isFunction;
exports.isObject = isObject;
