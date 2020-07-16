module.exports = ({ query }, { input }) => {
  const q = { ...query };

  const {
    includeIds,
    excludeIds,
    rootOnly,
    taxonomyIds,
    relatedSectionIds,
    excludeAliases,
    includeAliases,
  } = input;

  if (rootOnly) q['parent.$id'] = { $exists: false };
  if (taxonomyIds.length) q['relatedTaxonomy.$id'] = { $in: taxonomyIds };
  if (relatedSectionIds.length) q.relatedSections = { $in: relatedSectionIds };
  if (includeIds.length || excludeIds.length) {
    q._id = {
      ...(includeIds.length && { $in: includeIds }),
      ...(excludeIds.length && { $nin: excludeIds }),
    };
  }
  if (includeAliases.length || excludeAliases.length) {
    q.alias = {
      ...(includeAliases.length && { $in: includeAliases }),
      ...(excludeAliases.length && { $nin: excludeAliases }),
    };
  }

  return { query: q };
};
