const { get, getAsArray } = require('@base-cms/object-path');

module.exports = ({
  data = {},
  doc = {},
  fn,
} = {}) => {
  Object.keys(data).forEach((field) => {
    const tgts = Object.keys(data[field]);
    tgts.forEach((target) => {
      const flds = getAsArray(data, `${field}.${target}`);
      flds.forEach((fv) => {
        const prefix = `legacy.${target}.${fv}`;
        const v = get(doc, `${prefix}.und.0.value`, get(doc, `${prefix}.en.0.value`, get(doc, `${prefix}.en.0.url`, get(doc, `${prefix}.und.0.url`))));
        if (v) fn({ value: v, field });
      });
    });
  });
};
