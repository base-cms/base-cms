const { getPublishedContentCriteria } = require('@base-cms/utils');

module.exports = ({ query }, { input }) => {
  const { since } = input;

  if (since) {
    const criteria = getPublishedContentCriteria({ since });
    return { query: { ...query, ...criteria } };
  }

  return { query };
};
