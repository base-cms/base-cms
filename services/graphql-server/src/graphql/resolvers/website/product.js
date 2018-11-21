const basedb = require('../../../basedb');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteProductSite: (_, { input }) => {
      const { id } = input;
      return basedb.findOne('platform.Product', { _id: id, type: 'Site' });
    },
  },
};
