const { getAsArray } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');

const { MARKO_WEB_GTM_USE_ORIGINAL_URL } = process.env;

module.exports = ({ obj, req }) => {
  const section = asObject(obj);
  const hierarchy = getAsArray(section, 'hierarchy').map(s => ({
    id: s.id,
    name: s.name,
    alias: s.alias,
  }));
  return {
    page_type: 'website-section',
    canonical_path: MARKO_WEB_GTM_USE_ORIGINAL_URL ? req.originalUrl : section.canonicalPath,
    section: {
      id: section.id,
      name: section.name,
      alias: section.alias,
      fullName: section.fullName,
    },
    section_hierarchy: hierarchy,
  };
};
