const objectPath = require('object-path');
const inflection = require('inflection');
const { BaseDB } = require('@base-cms/db');

const { underscore, dasherize } = inflection;

module.exports = {
  id: content => content._id,
  slug: content => objectPath.get(content, 'mutations.Website.slug'),
  type: content => dasherize(underscore(content.type)),
  sectionAlias: async (content, { load }) => {
    const ref = BaseDB.get(content, 'mutations.Website.primarySection');
    const id = BaseDB.extractRefId(ref);
    if (!id) return 'home';
    const section = await load('activeWebsiteSections', id, { alias: 1 });
    return section ? section.alias : 'home';
  },
};
