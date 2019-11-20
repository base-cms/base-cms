module.exports = {
  Query: {
    activeUser: (_, __, { auth }) => auth.getUser(),
  },
  Mutation: {
    login: (_, { input }, { userService }) => {
      const { username, password } = input;
      return userService.login(username, password);
    },
    logout: (_, __, { userService, auth }) => userService.logout(auth.getToken()),
  },
};
