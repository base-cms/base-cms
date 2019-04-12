
module.exports = {
  /**
   *
   */
  WebsiteRedirect: {
    code: ({ code }) => code || 301,
  },

  /**
   *
   */
  Query: {
    websiteRedirect: (_, { input }, { basedb }) => {
      const { from } = input;
      return basedb.findOne({ from });
    },
  },
};
