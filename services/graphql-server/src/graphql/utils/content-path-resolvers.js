const objectPath = require('object-path');
const inflection = require('inflection');

const { underscore, dasherize } = inflection;

module.exports = {
  id: content => content._id,
  slug: content => objectPath.get(content, 'mutations.Website.slug'),
  type: content => dasherize(underscore(content.type)),
  sectionAlias: async (content, { basedb }) => {
    const section = await basedb.referenceOne({
      doc: content,
      relatedModel: 'website.Section',
      localField: 'mutations.Website.primarySection',
      foreignField: '_id',
      projection: { alias: 1 },
    });
    return section ? section.alias : 'home';
  },
};
