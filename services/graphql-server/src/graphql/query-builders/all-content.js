module.exports = ({ query }, { input }) => {
  const { ids } = input;

  if (ids.length) {
    return { query: { ...query, _id: { $in: ids } } };
  }

  return { query };
};
