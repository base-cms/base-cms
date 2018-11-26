const { BaseDB } = require('@base-cms/db');
const formatStatus = require('../../utils/format-status');

module.exports = {
  /**
   *
   */
  WebsiteOption: {
    site: async (option, { input }, { basedb }) => {
      const { status } = input;
      const id = BaseDB.extractRefId(option.site);
      if (!id) return null;
      return basedb.findOne('platform.Product', {
        _id: id,
        type: 'Site',
        ...formatStatus(status),
      });
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteOption: (_, { input }, { basedb }) => {
      const { id, status } = input;
      return basedb.findOne('website.Option', {
        _id: id,
        ...formatStatus(status),
      });
    },
  },
};
