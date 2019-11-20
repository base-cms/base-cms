module.exports = {
  Query: {
    activeUser: (_, __, { auth }) => auth.getUser(),
  },
  Mutation: {
    userLogin: (_, { input }, { userService }) => {
      const { username, password } = input;
      return userService.login(username, password);
    },
    userLogout: (_, __, { userService, auth }) => userService.logout(auth.getToken()),
  },
};
