module.exports = ({ query }, { input }) => {
  const q = { ...query };

  const {
    includeIds,
    excludeIds,
    rootOnly,
    taxonomyIds,
  } = input;

  if (rootOnly) q['parent.$id'] = { $exists: false };
  if (taxonomyIds.length) q['relatedTaxonomy.$id'] = { $in: taxonomyIds };
  if (includeIds.length || excludeIds.length) {
    q._id = {};
    if (includeIds.length) q._id.$in = includeIds;
    if (excludeIds.length) q._id.$nin = excludeIds;
  }

  return { query: q };
};
