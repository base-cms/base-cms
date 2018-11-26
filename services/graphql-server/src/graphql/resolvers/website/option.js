const formatStatus = require('../../utils/format-status');

module.exports = {
  /**
   *
   */
  WebsiteOption: {
    site: (option, { input }, { basedb }) => basedb.referenceOne({
      doc: option,
      relatedModel: 'platform.Product',
      localField: 'site',
      foreignField: '_id',
      query: { type: 'Site', ...formatStatus(input.status) },
    }),
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

    websiteOptions: (_, { input }, { basedb }) => {
      const {
        status,
        siteId,
        sort,
        pagination,
      } = input;
      const query = { ...formatStatus(status) };
      if (siteId) query['site.$id'] = siteId;
      return basedb.paginate('website.Option', { query, sort, ...pagination });
    },
  },
};
