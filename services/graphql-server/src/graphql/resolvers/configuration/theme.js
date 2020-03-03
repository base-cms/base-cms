module.exports = {
  /**
   *
   */
  ConfigurationTheme: { __resolveType: ({ type }) => `ConfigurationTheme${type}` },
  /**
   *
   */
  Mutation: {
    updateConfigurationTheme: async (_, { input }, { basedb }) => {
      const { id } = input;
      await basedb.strictFindById('configuration.Theme', id);
      const { _id, type, ...payload } = input.payload;
      await basedb.updateOne('configuration.Theme', { _id: id }, { $set: { ...payload } });
      return basedb.strictFindById('configuration.Theme', id);
    },
  },
};
