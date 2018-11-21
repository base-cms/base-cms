const basedb = require('../../../basedb');
const formatStatus = require('../../utils/format-status');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteOption: async (_, { input }) => {
      const { id, status } = input;
      const query = {
        _id: id,
        ...formatStatus(status),
      };
      return basedb.findOne('website.Option', query);
    },
  },
};
