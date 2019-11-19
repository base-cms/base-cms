module.exports = {
  Query: {
    activeUser: (_, __, { user }) => user.getUser(),
  },
  Mutation: {
    userLogin: async (_, { input }, { user }) => {
      const { username, password } = input;
      const token = await user.login(username, password);
      return { user: user.getUser(), token };
    },
    userLogout: async (_, __, { user }) => {
      await user.logout();
      return 'ok';
    },
  },
};
