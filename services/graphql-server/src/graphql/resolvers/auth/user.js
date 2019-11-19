module.exports = {
  Query: {
    activeUser: (_, input, { user }) => user.getUser(),
  },
};
