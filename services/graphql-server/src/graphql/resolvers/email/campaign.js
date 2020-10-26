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
        beginning,
        ending,
      } = input;
      const query = {};

      if (productId) query['product.$id'] = productId;

      if (beginning.before || beginning.after || ending.before || ending.after) {
        query.$and = [];
        if (beginning.before) query.$and.push({ scheduled: { $lte: beginning.before } });
        if (beginning.after) query.$and.push({ scheduled: { $gte: beginning.after } });
        if (ending.before) query.$and.push({ scheduled: { $lte: ending.before } });
        if (ending.after) query.$and.push({ scheduled: { $gte: ending.after } });
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
