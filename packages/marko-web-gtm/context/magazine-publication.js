const { asObject } = require('@base-cms/utils');

const { MARKO_WEB_GTM_USE_ORIGINAL_URL } = process.env;

module.exports = ({ obj, req }) => {
  const publication = asObject(obj);
  return {
    page_type: 'magazine-publication',
    canonical_path: MARKO_WEB_GTM_USE_ORIGINAL_URL ? req.originalUrl : publication.canonicalPath,
    publication: {
      id: publication.id,
      name: publication.name,
    },
  };
};
