module.exports = {
  /**
   *
   */
  Mutation: {
    updateIcarusConfiguration: async (_, { input }, { basedb }) => {
      const { id } = input;
      await basedb.strictFindOne('configuration.Theme', { _id: id, type: 'Icarus' });
      const { _id, type, ...payload } = input.payload;
      await basedb.updateOne('configuration.Theme', { _id: id }, { $set: { ...payload } });
      return basedb.strictFindOne('configuration.Theme', { _id: id, type: 'Icarus' });
    },
  },
};
