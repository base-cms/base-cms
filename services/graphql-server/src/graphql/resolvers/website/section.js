const formatStatus = require('../../utils/format-status');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSection: (_, { input }, { basedb }) => {
      const { id, status } = input;
      return basedb.findOne('website.Section', {
        _id: id,
        ...formatStatus(status),
      });
    },
  },
};
