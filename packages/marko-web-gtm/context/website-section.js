const { getAsArray } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');
const buildQueryString = require('../utils/build-query-string');

module.exports = ({ obj, req }) => {
  const section = asObject(obj);
  const hierarchy = getAsArray(section, 'hierarchy').map(s => ({
    id: s.id,
    name: s.name,
    alias: s.alias,
  }));
  return {
    page_type: 'website-section',
    canonical_path: section.canonicalPath,
    query_string: buildQueryString({ req }),
    section: {
      id: section.id,
      name: section.name,
      alias: section.alias,
      fullName: section.fullName,
    },
    section_hierarchy: hierarchy,
  };
};
