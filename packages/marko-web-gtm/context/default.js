const { asObject } = require('@base-cms/utils');
const buildQueryString = require('../utils/build-query-string');

module.exports = ({ type, obj, req }) => {
  const o = asObject(obj);
  return {
    page_type: type,
    canonical_path: o.canonicalPath || req.path,
    query_string: buildQueryString({ req }),
  };
};
