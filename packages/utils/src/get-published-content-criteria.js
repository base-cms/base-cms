const getDefaultContentTypes = require('./get-default-content-types');

const { isArray } = Array;

module.exports = ({
  excludeContentIds = [],
  contentTypes = [],
  excludeContentTypes = [],
  since,
} = {}) => {
  const date = since || new Date();
  const types = isArray(contentTypes) && contentTypes.length
    ? contentTypes : getDefaultContentTypes();

  const type = { $in: types };
  if (isArray(excludeContentTypes) && excludeContentTypes.length) {
    type.$nin = excludeContentTypes;
  }

  const query = {
    status: 1,
    type,
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
