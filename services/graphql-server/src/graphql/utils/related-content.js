const { BaseDB } = require('@base-cms/db');
const { UserInputError } = require('apollo-server-express');
const { get } = require('@base-cms/object-path');

const connectionProjection = require('./connection-projection');
const { getPublishedCriteria } = require('./content');

const buildQuery = (doc, { input }) => {
  const {
    excludeContentTypes,
    includeContentTypes,
    queryTypes,
    requiresImage,
  } = input;

  // Extract the relatedTo IDs and primary section ID.
  const relatedToIds = BaseDB.extractRefIds(doc.relatedTo);
  const primarySectionId = BaseDB.extractRefId(get(doc, 'mutations.Website.primarySection'));

  // Get the default published content criteria, based on requested content types.
  const criteria = getPublishedCriteria({
    excludeContentIds: [doc._id],
    contentTypes: includeContentTypes,
  });

  // Apply additional criteria based on input values.
  if (requiresImage) criteria.primaryImage = { $exists: true };
  if (excludeContentTypes.length) criteria.$and.push({ type: { $nin: excludeContentTypes } });

  // Map the query types to a query $or.
  const $or = queryTypes.map((queryType) => {
    switch (queryType) {
      case 'owned':
        return { _id: { $in: relatedToIds } };
      case 'inverse':
        return { 'relatedTo.$id': doc._id };
      case 'primarySection':
        return { 'mutations.Website.primarySection.$id': primarySectionId };
      case 'company':
        return { company: doc._id };
      default:
        throw new UserInputError(`No related content handler found for type '${queryType}'`);
    }
  });

  return {
    $and: [criteria, { $or }],
  };
};

const performQuery = (doc, { input, basedb, info }) => {
  const { pagination } = input;

  const query = buildQuery(doc, { input });
  const projection = connectionProjection(info);

  return basedb.paginate('platform.Content', {
    query,
    sort: { field: 'published', order: 'desc' },
    projection,
    ...pagination,
  });
};

module.exports = {
  performQuery,
  buildQuery,
};
