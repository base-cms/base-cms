const { BaseDB } = require('@base-cms/db');
const { magazineIssue: canonicalPathFor } = require('@base-cms/canonical-path');
const { createTitle, createDescription } = require('../../utils/magazine-issue');
const connectionProjection = require('../../utils/connection-projection');
const shouldCollate = require('../../utils/should-collate');
const applyInput = require('../../utils/apply-input');
const formatStatus = require('../../utils/format-status');

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

    sections: async (issue, { input }, { basedb }, info) => {
      const {
        status,
        sort,
        pagination,
        includeGlobal,
      } = input;

      const publicationId = BaseDB.extractRefId(issue.publication);

      const $or = [{ 'issue.$id': issue._id }];
      if (includeGlobal) $or.push({ 'publication.$id': publicationId });

      const query = applyInput({
        query: { ...formatStatus(status), $or },
        input,
      });

      const projection = connectionProjection(info);
      const result = await basedb.paginate('magazine.Section', {
        query,
        sort,
        ...pagination,
        collate: shouldCollate(sort.field),
        projection,
      });
      return result;
    },
  },
};
