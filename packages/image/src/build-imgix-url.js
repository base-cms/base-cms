const { camelize } = require('@base-cms/inflector');
const { URL, URLSearchParams } = require('url');

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

const coreDefaults = {
  auto: 'format',
  h: 640,
  w: 640,
};

module.exports = (src, selected, defaults) => {
  const options = selected || defaults || coreDefaults;
  try {
    const url = new URL(src);
    const searchParams = params.sort().reduce((sp, key) => {
      const optVal = options[camelize(key)];
      const searchVal = url.searchParams.get(key);
      const value = optVal || searchVal;
      if (value) sp.append(key, value);
      return sp;
    }, new URLSearchParams());
    url.search = searchParams;
    return url.toString();
  } catch (e) {
    return src;
  }
};
