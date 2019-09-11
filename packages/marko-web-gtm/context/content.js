const { getAsObject, getAsArray } = require('@base-cms/object-path');
const { asObject } = require('@base-cms/utils');

module.exports = ({ obj }) => {
  const content = asObject(obj);
  const company = getAsObject(content, 'company');
  const createdBy = getAsObject(content, 'createdBy');
  const section = getAsObject(content, 'primarySection');
  const hierarchy = getAsArray(section, 'hierarchy').map(s => ({
    id: s.id,
    name: s.name,
  }));
  const taxonomy = getAsArray(content, 'taxonomy.edges').map(({ node }) => ({
    id: node.id,
    type: node.type,
    name: node.name,
    fullName: node.fullName,
  }));
  const authors = getAsArray(content, 'authors.edges').map(({ node }) => ({
    id: node.id,
    name: node.name,
  }));
  return {
    page_type: 'content',
    canonical_path: content.canonicalPath,
    content: {
      id: content.id,
      type: content.type,
      name: content.name,
      published: content.published ? new Date(content.published).toISOString() : undefined,
    },
    created_by: {
      id: createdBy.id,
      username: createdBy.username,
      firstName: createdBy.firstName,
      lastName: createdBy.lastName,
    },
    company: {
      id: company.id,
      name: company.name,
    },
    section: {
      id: section.id,
      name: section.name,
      fullName: section.fullName,
    },
    section_hierarchy: hierarchy,
    taxonomy,
    authors,
  };
};
