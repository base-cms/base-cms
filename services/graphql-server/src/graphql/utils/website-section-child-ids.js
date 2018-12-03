const { isArray } = Array;

module.exports = async (sectionId, basedb) => {
  const section = await basedb.findById('website.Section', sectionId, {
    projection: { descendantIds: 1 },
  });
  const { descendantIds } = section || {};
  return isArray(descendantIds) ? descendantIds : [];
};
