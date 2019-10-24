module.exports = ({ query }, { input }) => {
  const q = { ...query };

  const {
    publicationId,
    excludeIssueIds,
  } = input;

  q.mailDate = { $lte: new Date() };
  q['publication.$id'] = publicationId;
  if (excludeIssueIds.length) q._id = { $nin: excludeIssueIds };

  return { query: q };
};
