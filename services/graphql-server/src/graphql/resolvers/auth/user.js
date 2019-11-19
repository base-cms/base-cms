const service = require('../../../user-context/service');

module.exports = {
  Query: {
    activeUser: (_, __, { user }) => user.getUser(),
  },
  Mutation: {
    userLogin: async (_, { input }) => {
      const { username, password } = input;
      return service.login(username, password);
    },
    userLogout: async () => {
      await service.logout();
      return 'ok';
    },
  },
};
