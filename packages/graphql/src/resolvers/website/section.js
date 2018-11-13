const { BaseDB } = require('@base-cms/db');
const formatStatus = require('../../utils/format-status');

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSection: async (_, { input }, { db }) => {
      const { id, status } = input;
      return db.call('findOne', {
        modelName: 'website.Section',
        query: { _id: BaseDB.coerceID(id), ...formatStatus(status) },
      });
    },

    /**
     *
     */
    websiteSectionAlias: async (_, { input }, { db }) => {
      const { alias, status } = input;
      return db.call('findOne', {
        modelName: 'website.Section',
        query: { alias, ...formatStatus(status) },
      });
    },

    /**
     *
     */
    // websiteSectionRedirect: async (_, { input }, { auth, base4 }) => {
    //   auth.check();
    //   const { alias, status } = input;
    //   const criteria = { redirects: alias, ...formatStatus(status) };
    //   return base4.findOne('website.Section', { criteria });
    // },

    /**
     *
     */
    // websiteSections: async (_, { input }, { auth, base4 }) => {
    //   auth.check();
    //   const {
    //     status,
    //     parentId,
    //     siteId,
    //     sort,
    //     pagination,
    //   } = input;

    //   const criteria = { ...formatStatus(status) };
    //   if (parentId === 0) {
    //     criteria['parent.$id'] = { $exists: false };
    //   } else if (parentId) {
    //     criteria['parent.$id'] = parentId;
    //   }
    //   if (siteId) criteria['site.$id'] = new ObjectID(siteId);
    //   return base4.paginate('website.Section', { pagination, sort, criteria });
    // },

    /**
     *
     */
    // websiteSectionsFromIds: async (_, { input }, { auth, base4 }) => {
    //   auth.check();
    //   const { ids, sort, pagination } = input;
    //   const criteria = { _id: { $in: ids } };
    //   return base4.paginate('website.Section', { pagination, sort, criteria });
    // },
  },
};
