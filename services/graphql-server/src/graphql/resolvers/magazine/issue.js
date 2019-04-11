const { magazineIssue: canonicalPathFor } = require('@base-cms/canonical-path');

module.exports = {
  /**
   *
   */
  MagazineIssue: {
    canonicalPath: (issue, _, ctx) => canonicalPathFor(issue, ctx),
  },
  /**
   *
   */
  Query: {
    /**
     *
     */
    magazineLatestIssue: async (_, { input }, { basedb }) => {
      const { publicationId } = input;
      const mailDate = new Date();
      const query = {
        status: 1,
        'publication.$id': publicationId,
        mailDate: { $lte: mailDate },
      };
      const options = {
        sort: [['mailDate', 'descending']],
      };
      return basedb.findOne('magazine.Issue', query, options);
    },
  },
};
