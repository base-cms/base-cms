const { isObject } = require('@base-cms/utils');

const { isArray } = Array;

module.exports = (targeting) => {
  if (!isObject(targeting)) return '';
  return Object.keys(targeting).map((key) => {
    const value = targeting[key];
    const v = isArray(value) ? value : [value];
    // @todo targeting values must be cleaned!
    return `setTargeting('${key}', ${JSON.stringify(v)})`;
  }).join('.');
};
