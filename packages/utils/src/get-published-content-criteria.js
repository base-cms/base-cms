const getDefaultContentTypes = require('./get-default-content-types');

const { isArray } = Array;

module.exports = ({
  excludeContentIds = [],
  contentTypes = [],
  since,
} = {}) => {
  const date = since || new Date();
  const types = isArray(contentTypes) && contentTypes.length
    ? contentTypes : getDefaultContentTypes();

  const query = {
    status: 1,
    type: { $in: types },
    published: { $lte: date },
    $and: [
      {
        $or: [
          { unpublished: { $gt: date } },
          { unpublished: { $exists: false } },
        ],
      },
    ],
  };
  if (isArray(excludeContentIds) && excludeContentIds.length) {
    query._id = { $nin: excludeContentIds };
  }
  return query;
};
