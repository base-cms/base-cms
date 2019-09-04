const { getAsObject } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');

module.exports = ({ obj }) => {
  const content = asObject(obj);
  const company = getAsObject(content, 'company');
  const createdBy = getAsObject(content, 'createdBy');
  const section = getAsObject(content, 'primarySection');
  const channel = getAsObject(section, 'hierarchy.0');
  return {
    page_type: 'content',
    canonical_path: content.canonicalPath,
    content_id: content.id,
    content_type: content.type,
    content_title: content.name,
    published_date: content.published ? new Date(content.published).toISOString() : undefined,
    created_by_id: createdBy.id,
    created_by_username: createdBy.username,
    company_id: company.id,
    company_name: company.name,
    section_id: section.id,
    section_name: section.name,
    section_path: section.fullName,
    root_section_id: channel.id,
    root_section_name: channel.name,
  };
};
