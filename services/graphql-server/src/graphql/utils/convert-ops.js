const rename = require('deep-rename-keys');

module.exports = (obj) => {
  if (!obj || typeof obj !== 'object') return {};
  return rename(obj, (key) => {
    const pattern = /^__/;
    if (pattern.test(key)) return key.replace(pattern, '$');
    return key;
  });
};
