const websiteSections = require('./website-sections');

module.exports = (currentValues, variables, ctx, info, obj) => {
  const { _id } = obj;
  const { query, ...values } = currentValues;
  const newValues = { ...values, query: { ...query, 'site.$id': _id } };
  return websiteSections(newValues, variables, ctx, info, obj);
};
