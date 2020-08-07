const { BaseDB } = require('@base-cms/db');

module.exports = {
  Query: {
    /**
     *
     */
    getCampaigns: async (_, { input }, { basedb }) => {
      const { id } = input;
      const id2 = BaseDB.coerceID(id);
      const campaigns = basedb.find('email.Campaign', { 'product.$id': id2 }, {
        projection: {
          _id: 1,
          deploymentDate: 1,
          scheduled: 1,
        },
      });

      return campaigns;
    },
  },
};
