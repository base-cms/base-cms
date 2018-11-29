const { SchemaDirectiveVisitor } = require('graphql-tools');
const { UserInputError } = require('apollo-server-express');
const objectPath = require('object-path');
const { BaseDB } = require('@base-cms/db');

class RelatedContentDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }, { basedb }) => {
      const { type } = this.args;
      const {
        includeContentTypes,
        excludeContentTypes,
        requiresImage,
        pagination,
        sort,
      } = input;

      const now = new Date();
      const query = {
        status: 1,
        published: { $lte: now },
        $and: [
          {
            $or: [
              { unpublished: { $gt: now } },
              { unpublished: { $exists: false } },
            ],
          },
        ],
      };

      const sectionId = BaseDB.extractRefId(objectPath.get(doc, 'mutations.Website.primarySection'));
      const relatedToIds = BaseDB.extractRefIds(doc.relatedTo);

      switch (type) {
        case 'owned':
          query._id = { $in: relatedToIds };
          break;
        case 'inverse':
          query['relatedTo.$id'] = doc._id;
          break;
        case 'combined':
          query.$or = [
            { _id: { $in: relatedToIds } },
            { 'relatedTo.$id': doc._id },
          ];
          break;
        case 'primarySection':
          query['mutations.Website.primarySection.$id'] = sectionId;
          break;
        case 'company':
          query.$or = [
            { company: doc._id },
            { 'relatedTo.$id': doc._id },
          ];
          break;
        default:
          throw new UserInputError(`No related content handler found for type '${type}'`);
      }

      if (includeContentTypes.length) {
        query.$and.push({ type: { $in: includeContentTypes } });
      }
      if (excludeContentTypes.length) {
        query.$and.push({ type: { $nin: excludeContentTypes } });
      }
      if (requiresImage) {
        query.primaryImage = { $exists: true };
      }

      const model = 'platform.Content';
      console.log('@relatedContent', model, query);
      return basedb.paginate(model, { query, sort, ...pagination });
    };
  }
}

module.exports = RelatedContentDirective;
