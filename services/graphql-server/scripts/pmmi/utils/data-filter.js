const { get, getAsObject } = require('@base-cms/object-path');

const targets = ['ldc', 'lop', 'lpc', 'raw'];

module.exports = ({
  doc = {},
  fields = [],
  map = {},
} = {}) => {
  const missing = fields.filter(f => !Object.keys(doc).includes(f) || !get(doc, f));
  const activeTargets = targets.filter(target => Object.keys(getAsObject(doc, 'legacy')).includes(target));

  return missing.reduce((obj, field) => ({
    ...obj,
    [field]: activeTargets.reduce((tgt, target) => {
      const keys = Object.keys(get(doc, `legacy.${target}`));
      const matches = [
        ...keys.filter(key => key.includes(field)),
        ...keys.filter(key => key.includes(map[field])),
      ];
      return matches.length ? { ...tgt, [target]: matches } : tgt;
    }, {}),
  }), {});
};
