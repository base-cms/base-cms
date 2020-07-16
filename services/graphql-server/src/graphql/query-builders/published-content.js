const { getPublishedContentCriteria } = require('@base-cms/utils');

module.exports = ({ query }, { input }) => {
  const { since, after } = input;

  if (since || after) {
    const criteria = getPublishedContentCriteria({ since, after });
    return { query: { ...query, ...criteria } };
  }

  return { query };
};
