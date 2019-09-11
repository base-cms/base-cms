const { getAsArray } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');

module.exports = ({ obj }) => {
  const section = asObject(obj);
  const hierarchy = getAsArray(section, 'hierarchy').map(s => ({
    id: s.id,
    name: s.name,
  }));
  return {
    page_type: 'website-section',
    canonical_path: section.canonicalPath,
    section: {
      id: section.id,
      name: section.name,
      fullName: section.fullName,
    },
    section_hierarchy: hierarchy,
  };
};
