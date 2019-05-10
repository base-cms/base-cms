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
  'fill-color',
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
  h: 320,
  w: 320,
};

module.exports = (src, selected, defaults, isLogo) => {
  const options = { ...(selected || defaults || coreDefaults) };
  if (isLogo) {
    options.fit = 'fillmax';
    options.fillColor = options.fillColor || 'fff';
  }
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
