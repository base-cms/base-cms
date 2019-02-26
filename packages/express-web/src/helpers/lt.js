const { compareNumbers: compare } = require('@base-cms/utils');

module.exports = (...[left, right, { hash } = {}]) => {
  const { forceNumber } = hash;
  return compare('lt', left, right, forceNumber);
};
