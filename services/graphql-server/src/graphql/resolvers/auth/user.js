const service = require('../../../auth-context/user-service');

module.exports = {
  Query: {
    activeUser: (_, __, { user }) => user.getUser(),
  },
  Mutation: {
    userLogin: (_, { input }) => {
      const { username, password } = input;
      return service.login(username, password);
    },
    userLogout: () => service.logout(),
  },
};
