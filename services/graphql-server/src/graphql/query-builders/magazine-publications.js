module.exports = ({ query }, { input }) => {
  const q = { ...query };

  const { publicationIds } = input;

  if (publicationIds.length) q._id = { $in: publicationIds };

  return { query: q };
};
