module.exports = ({ query }, { input }) => {
  const q = { ...query };

  const {
    publicationId,
    excludeIssueIds,
    requiresCoverImage,
  } = input;

  q.mailDate = { $lte: new Date() };
  q['publication.$id'] = publicationId;
  if (excludeIssueIds.length) q._id = { $nin: excludeIssueIds };
  if (requiresCoverImage) q['coverImage.$id'] = { $exists: true };

  return { query: q };
};
