module.exports = (doc, currentValues) => {
  const { _id } = doc;
  const { query, ...values } = currentValues;
  return { ...values, query: { ...query, 'collection.$id': _id } };
};
