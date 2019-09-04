const { getAsObject } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');

module.exports = ({ obj }) => {
  const section = asObject(obj);
  const channel = getAsObject(section, 'hierarchy.0');
  return {
    page_type: 'website-section',
    canonical_path: section.canonicalPath,
    section_id: section.id,
    section_name: section.name,
    section_path: section.fullName,
    root_section_id: channel.id,
    root_section_name: channel.name,
  };
};
