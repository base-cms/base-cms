const { isObject } = require('@base-cms/utils');

const { isArray } = Array;

const invalid = /["'=!+#*~;^()[\]<>,.&]/g;

const clean = value => `${value || ''}`.replace(invalid, '').trim();

module.exports = (targeting) => {
  if (!isObject(targeting)) return '';
  return Object.keys(targeting).map((key) => {
    const value = targeting[key];
    const values = isArray(value) ? value : [value];
    // Clean the key and the values.
    // Per https://support.google.com/admanager/answer/177381
    return `setTargeting('${clean(key)}', ${JSON.stringify(values.map(clean))})`;
  }).join('.');
};
