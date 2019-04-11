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
      const { publicationId, sort: { field, order } } = input;
      const mailDate = new Date();
      const query = {
        status: 1,
        'publication.$id': publicationId,
        mailDate: { $lte: mailDate },
      };
      const sort = { [field]: order === 'desc' ? -1 : 1 };
      return basedb.findOne('magazine.Issue', query, { sort });
    },
  },
};
