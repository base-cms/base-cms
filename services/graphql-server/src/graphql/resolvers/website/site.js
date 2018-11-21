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
    websiteSite: (_, { input }) => {
      const { id, status } = input;
      const query = {
        _id: id,
        type: 'Site',
        ...formatStatus(status),
      };
      return basedb.findOne('platform.Product', query);
    },
  },
};
