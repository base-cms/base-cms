const { get } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');

module.exports = ({ obj }) => {
  const page = asObject(obj);
  return {
    page_type: 'dynamic-page',
    canonical_path: get(page, 'siteContext.path'),
    page: {
      id: page.id,
      name: page.name,
      alias: page.alias,
    },
  };
};
