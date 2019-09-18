const { asObject } = require('@base-cms/utils');

module.exports = ({ type, obj, req }) => {
  const o = asObject(obj);
  return { page_type: type, canonical_path: o.canonicalPath || req.path };
};
