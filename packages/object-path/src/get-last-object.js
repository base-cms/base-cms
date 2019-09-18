const { isObject } = require('@base-cms/utils');
const get = require('./get');

const { isArray } = Array;

const pop = stack => stack.pop() || {};

const getLastObject = (obj, path, stack = []) => {
  if (isObject(obj)) stack.push(obj);
  if (!path) return pop(stack);
  const parts = isArray(path) ? path.slice(0) : path.split('.');
  if (!parts.length) return pop(stack);
  const value = get(obj, parts.shift());
  if (isObject(value)) {
    stack.push(value);
    return getLastObject(value, parts, stack);
  }
  return pop(stack);
};

module.exports = getLastObject;
