const buildProjection = require('../../utils/build-projection');

module.exports = {
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    updateBrevityIssueStories: async (_, { input }, { basedb }, info) => {
      const { id, payload } = input;
      const { storyIds } = payload;
      await basedb.strictFindById('brevity.Issue', id);
      const stories = storyIds.map($id => ({ $ref: 'Story', $id }));
      await basedb.updateOne('brevity.Issue', { _id: id }, { $set: { stories } });
      const projection = buildProjection({ info, type: 'BrevityIssue' });
      return basedb.findOne('brevity.Issue', { _id: id }, { projection });
    },
  },
};
