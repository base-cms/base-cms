module.exports = {
  Query: {
    activeUser: (_, __, { user }) => user.getUser(),
  },
  Mutation: {
    userLogin: (_, { input }, { userService }) => {
      const { username, password } = input;
      return userService.login(username, password);
    },
    userLogout: (_, __, { userService }) => userService.logout(),
  },
};
