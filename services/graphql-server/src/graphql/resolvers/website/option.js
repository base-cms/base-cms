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
  },
};
