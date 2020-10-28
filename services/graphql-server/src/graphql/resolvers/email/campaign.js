const connectionProjection = require('../../utils/connection-projection');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    emailCampaigns: async (_, { input }, { basedb }, info) => {
      const {
        sort,
        productId,
        pagination,
        scheduledAfter,
        scheduledBefore,
      } = input;
      const query = {};

      if (productId) query['product.$id'] = productId;

      if (scheduledAfter || scheduledBefore) {
        query.$and = [];
        if (scheduledBefore) query.$and.push({ scheduled: { $lte: scheduledBefore } });
        if (scheduledAfter) query.$and.push({ scheduled: { $gte: scheduledAfter } });
      }

      const projection = connectionProjection(info);
      return basedb.paginate('email.Campaign', {
        query,
        sort,
        projection,
        ...pagination,
      });
    },
  },
};
