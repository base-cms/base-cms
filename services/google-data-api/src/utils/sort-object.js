module.exports = (object = {}) => {
  const keys = Object.keys(object).sort();
  return keys.reduce((obj, key) => ({ ...obj, [key]: object[key] }), {});
};
