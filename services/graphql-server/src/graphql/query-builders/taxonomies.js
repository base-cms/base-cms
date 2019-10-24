module.exports = ({ query }, { input }) => {
  const q = { ...query };

  const {
    includeIds,
    excludeIds,
    includeTypes,
    excludeTypes,
    rootOnly,
  } = input;

  if (includeTypes.length) q.type.$in = includeTypes;
  if (excludeTypes.length) q.type.$nin = excludeTypes;
  if (rootOnly) q['parent.$id'] = { $exists: false };
  if (includeIds.length || excludeIds.length) {
    q._id = {};
    if (includeIds.length) q._id.$in = includeIds;
    if (excludeIds.length) q._id.$nin = excludeIds;
  }

  return { query: q };
};
