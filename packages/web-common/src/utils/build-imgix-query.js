const { camelize } = require('@base-cms/inflector');

const params = [
  'auto',
  'border',
  'border-radius',
  'border-radius-inner',
  'crop',
  'dpr',
  'fit',
  'fp-x',
  'fp-y',
  'h',
  'max-h',
  'max-w',
  'min-h',
  'min-w',
  'trim',
  'w',
];

module.exports = (selected, defaults) => {
  const options = selected || defaults;
  return params.sort().reduce((arr, key) => {
    const value = options[camelize(key)];
    if (value) arr.push(`${key}=${value}`);
    return arr;
  }, []).join('&');
};
