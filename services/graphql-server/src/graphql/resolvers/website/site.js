const formatStatus = require('../../utils/format-status');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSite: async (_, { input }, { loaders }) => {
      const { id, status } = input;
      const query = {
        _id: id,
        type: 'Site',
        ...formatStatus(status),
      };
      return loaders.product.load(query);
    },
  },
};
