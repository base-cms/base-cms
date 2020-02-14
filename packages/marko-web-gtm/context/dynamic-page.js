const { get } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');

const { MARKO_WEB_GTM_USE_ORIGINAL_URL } = process.env;

module.exports = ({ obj, req }) => {
  const page = asObject(obj);
  return {
    page_type: 'dynamic-page',
    canonical_path: MARKO_WEB_GTM_USE_ORIGINAL_URL ? req.originalUrl : get(page, 'siteContext.path'),
    page: {
      id: page.id,
      name: page.name,
      alias: page.alias,
    },
  };
};
