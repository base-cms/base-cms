module.exports = (currentQuery, { input }) => {
  const query = { ...currentQuery };

  const {
    includeIds,
    excludeIds,
    includeTypes,
    excludeTypes,
    rootOnly,
  } = input;

  if (includeTypes.length) query.type.$in = includeTypes;
  if (excludeTypes.length) query.type.$nin = excludeTypes;
  if (rootOnly) query['parent.$id'] = { $exists: false };
  if (includeIds.length || excludeIds.length) {
    query._id = {};
    if (includeIds.length) query._id.$in = includeIds;
    if (excludeIds.length) query._id.$nin = excludeIds;
  }

  return query;
};
