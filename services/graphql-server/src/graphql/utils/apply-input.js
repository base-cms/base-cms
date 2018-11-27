const { isArray } = Array;

module.exports = ({ query, using, input }) => Object.keys(using)
  .filter(key => typeof input[key] !== 'undefined')
  .reduce((obj, key) => {
    const field = using[key];
    const value = input[key];
    return { ...obj, [field]: isArray(value) ? { $in: value } : value };
  }, query);
