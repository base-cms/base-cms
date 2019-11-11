const { isObject } = require('@base-cms/utils');

const { isArray } = Array;

const invalid = /["'=!+#*~;^()[\]<>,.&]/g;

const clean = value => `${value || ''}`.replace(invalid, '').trim();

module.exports = (targeting) => {
  if (!isObject(targeting)) return '';
  return Object.keys(targeting).map((key) => {
    const value = targeting[key];
    // Clean the key and the values.
    // Per https://support.google.com/admanager/answer/177381
    const cleaned = isArray(value) ? JSON.stringify(value.map(clean)) : clean(value);
    return `setTargeting('${clean(key)}', '${cleaned}')`;
  }).join('.');
};
