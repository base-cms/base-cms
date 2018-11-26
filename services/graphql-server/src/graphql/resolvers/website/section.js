const formatStatus = require('../../utils/format-status');

module.exports = {
  WebsiteSection: {
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
  },
};
