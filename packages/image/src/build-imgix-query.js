const { camelize } = require('@base-cms/inflector');

const params = [
  'auto',
  'blur',
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
  'px',
  'trim',
  'w',
];

const defs = {
  auto: 'format',
  h: 640,
  w: 640,
};

module.exports = (selected, defaults) => {
  const options = selected || defaults || defs;
  return params.sort().reduce((arr, key) => {
    const value = options[camelize(key)];
    if (value) arr.push(`${key}=${value}`);
    return arr;
  }, []).join('&');
};
