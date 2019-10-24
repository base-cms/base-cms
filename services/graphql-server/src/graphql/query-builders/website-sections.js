module.exports = (currentQuery, { input }) => {
  const query = { ...currentQuery };

  const {
    includeIds,
    excludeIds,
    rootOnly,
    taxonomyIds,
  } = input;

  if (rootOnly) query['parent.$id'] = { $exists: false };
  if (taxonomyIds.length) query['relatedTaxonomy.$id'] = { $in: taxonomyIds };
  if (includeIds.length || excludeIds.length) {
    query._id = {};
    if (includeIds.length) query._id.$in = includeIds;
    if (excludeIds.length) query._id.$nin = excludeIds;
  }

  return query;
};
