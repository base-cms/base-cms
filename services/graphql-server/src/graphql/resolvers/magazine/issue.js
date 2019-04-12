const { magazineIssue: canonicalPathFor } = require('@base-cms/canonical-path');
const { createTitle, createDescription } = require('../../utils/magazine-issue');

module.exports = {
  /**
   *
   */
  MagazineIssue: {
    canonicalPath: (issue, _, ctx) => canonicalPathFor(issue, ctx),
    metadata: issue => ({
      title: () => createTitle(issue),
      description: () => createDescription(issue),
    }),
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
        mailDate: { $lte: mailDate },
        'publication.$id': publicationId,
      };
      const sort = { [field]: order === 'desc' ? -1 : 1 };
      return basedb.findOne('magazine.Issue', query, { sort });
    },
  },
};
