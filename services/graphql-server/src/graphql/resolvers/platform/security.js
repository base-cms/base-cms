module.exports = {
  /**
   *
   */
  User: {
    name: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  },
};
