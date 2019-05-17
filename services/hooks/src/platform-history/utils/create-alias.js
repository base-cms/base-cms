const sluggify = require('./sluggify');

const { isArray } = Array;

module.exports = (tree, delimiter = '/') => {
  if (!isArray(tree)) return '';
  return tree.map(name => sluggify(name.trim())).filter(v => v).join(delimiter);
};
