const { asObject } = require('@base-cms/utils');

module.exports = ({ obj }) => {
  const page = asObject(obj);
  return {
    page_type: 'dynamic-page',
    canonical_path: page.canonicalPath,
  };
};
