const { BaseDB } = require('@base-cms/db');
const formatStatus = require('../../utils/format-status');

module.exports = {
  /**
   *
   */
  WebsiteOption: {
    site: async (option, { input }, { loaders }) => {
      const { status } = input;
      const id = BaseDB.extractRefId(option.site);
      if (!id) return null;
      const query = {
        _id: id,
        type: 'Site',
        ...formatStatus(status),
      };
      return loaders.product.load(query);
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteOption: async (_, { input }, { loaders }) => {
      const { id, status } = input;
      const query = {
        _id: id,
        ...formatStatus(status),
      };
      return loaders.websiteOption.load(query);
    },
  },
};
