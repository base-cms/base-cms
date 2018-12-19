import { g as _typeof } from './chunk-7be1e98d.js';

var componentDisplayName = (function (Comp) {
  if (typeof Comp === 'string') return Comp;
  return Comp.displayName || Comp.name || 'Unknown';
});

var isFunction = (function (v) {
  return typeof v === 'function';
});

var isObject = (function (v) {
  return v && _typeof(v) === 'object';
});

export { componentDisplayName, isFunction, isObject };
