const { magazineIssue: canonicalPathFor } = require('@base-cms/canonical-path');
const { createTitle, createDescription } = require('../../utils/magazine-issue');
const connectionProjection = require('../../utils/connection-projection');
const shouldCollate = require('../../utils/should-collate');

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
    magazineActiveIssues: async (_, { input }, { basedb }, info) => {
      const {
        publicationId,
        excludeIssueIds,
        sort,
        pagination,
      } = input;

      const projection = connectionProjection(info);
      const query = {
        status: 1,
        mailDate: { $lte: new Date() },
        'publication.$id': publicationId,
      };
      if (excludeIssueIds.length) {
        query._id = { $nin: excludeIssueIds };
      }
      return basedb.paginate('magazine.Issue', {
        query,
        sort,
        projection,
        collate: shouldCollate(sort.field),
        ...pagination,
      });
    },

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
