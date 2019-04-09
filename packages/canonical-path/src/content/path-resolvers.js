const { get } = require('@base-cms/object-path');
const { BaseDB } = require('@base-cms/db');
const { dasherize } = require('@base-cms/inflector');

module.exports = {
  id: content => content._id,
  slug: content => get(content, 'mutations.Website.slug'),
  type: content => dasherize(content.type),
  sectionAlias: async (content, { load }) => {
    const ref = BaseDB.get(content, 'mutations.Website.primarySection');
    const id = BaseDB.extractRefId(ref);
    if (!id) return 'home';
    const section = await load('websiteSection', id, { alias: 1 }, { status: 1 });
    return section ? section.alias : 'home';
  },
};
