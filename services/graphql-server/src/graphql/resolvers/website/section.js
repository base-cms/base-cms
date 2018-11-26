const formatStatus = require('../../utils/format-status');

module.exports = {
  WebsiteSection: {
    parent: (section, { input }, { basedb }) => basedb.referenceOne({
      doc: section,
      relatedModel: 'website.Section',
      localField: 'parent',
      foreignField: '_id',
      query: { ...formatStatus(input.status) },
    }),
    site: (section, { input }, { basedb }) => basedb.referenceOne({
      doc: section,
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
    websiteSection: (_, { input }, { basedb }) => {
      const { id, status } = input;
      return basedb.findOne('website.Section', {
        _id: id,
        ...formatStatus(status),
      });
    },

    /**
     *
     */
    websiteSections: (_, { input }, { basedb }) => {
      const {
        status,
        siteId,
        sort,
        pagination,
      } = input;
      const query = { ...formatStatus(status) };
      if (siteId) query['site.$id'] = siteId;
      return basedb.paginate('website.Section', { query, sort, ...pagination });
    },
  },
};
