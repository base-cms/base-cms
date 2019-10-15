const validateRest = require('../../utils/validate-rest');

module.exports = {
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    deleteEmailSchedule: async (_, { input }, { base4rest }) => {
      const { id } = input;
      validateRest(base4rest);
      await base4rest.removeOne({ model: 'email/schedule', id });
      return 'ok';
    },
  },
};
