module.exports = (currentQuery, { input }) => {
  const query = { ...currentQuery };

  const {
    publicationId,
    excludeIssueIds,
  } = input;

  query.mailDate = { $lte: new Date() };
  query['publication.$id'] = publicationId;
  if (excludeIssueIds.length) query._id = { $nin: excludeIssueIds };

  return query;
};
