module.exports = ({ query }, { input }) => {
  const q = { ...query };

  const { requiresCoverImage } = input;

  if (requiresCoverImage) q['coverImage.$id'] = { $exists: true };

  return { query: q };
};
