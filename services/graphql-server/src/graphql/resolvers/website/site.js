const { BaseDB } = require('@base-cms/db');
const formatStatus = require('../../utils/format-status');

module.exports = {
  /**
   *
   */
  WebsiteSite: {
    options: (site, { input }, { basedb }) => {
      const {
        status,
        sort,
        pagination,
      } = input;
      const query = {
        'site.$id': site._id,
        ...formatStatus(status),
      };
      return basedb.paginate('website.Option', { query, sort, ...pagination });
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSite: (_, { input }, { basedb }) => {
      const { id, status } = input;
      return basedb.findOne('platform.Product', {
        _id: BaseDB.coerceID(id),
        type: 'Site',
        ...formatStatus(status),
      });
    },

    /**
     *
     */
    websiteSites: (_, { input }, { basedb }) => {
      const {
        status,
        sort,
        pagination,
      } = input;
      const query = {
        type: 'Site',
        ...formatStatus(status),
      };
      return basedb.paginate('platform.Product', { query, sort, ...pagination });
    },
  },
};
