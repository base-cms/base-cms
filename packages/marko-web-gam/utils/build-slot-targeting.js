const { isObject } = require('@base-cms/utils');

const { isArray } = Array;

const invalid = /["'=!+#*~;^()[\]<>,.&]/g;

const clean = value => `${value || ''}`.replace(invalid, '').trim();

module.exports = (targeting) => {
  if (!isObject(targeting)) return '';
  return Object.keys(targeting).map((key) => {
    // Clean the key and the values.
    // Per https://support.google.com/admanager/answer/177381
    const value = (isArray(targeting[key])) ? JSON.stringify(targeting[key].map(clean)) : `'${clean(targeting[key])}'`;
    return `setTargeting('${clean(key)}', ${value})`;
  }).join('.');
};
