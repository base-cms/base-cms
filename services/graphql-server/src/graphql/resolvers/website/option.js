const basedb = require('../../../basedb');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteOption: async (_, { input }) => {
      const { id } = input;
      return basedb.findById('website.Option', id);
    },
  },
};
