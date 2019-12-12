const websiteSections = require('../query-builders/website-sections');

module.exports = (doc, currentValues, ...rest) => {
  const { _id } = doc;
  const { query, ...values } = currentValues;
  const newValues = { ...values, query: { ...query, 'site.$id': _id } };
  return websiteSections(newValues, ...rest);
};
