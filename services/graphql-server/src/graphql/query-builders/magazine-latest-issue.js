module.exports = ({ query }, { input }) => {
  const q = { ...query };

  const { publicationId } = input;

  q.mailDate = { $lte: new Date() };
  q['publication.$id'] = publicationId;

  return { query: q };
};
