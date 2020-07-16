module.exports = ({ query }, { input }) => {
  const q = { ...query };

  const { publicationId, requiresCoverImage } = input;

  q.mailDate = { $lte: new Date() };
  q['publication.$id'] = publicationId;
  if (requiresCoverImage) q['coverImage.$id'] = { $exists: true };

  return { query: q };
};
