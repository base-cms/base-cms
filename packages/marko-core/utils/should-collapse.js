module.exports = (collapse) => {
  if (collapse === 'false') return false;
  if (collapse == null) return true;
  return Boolean(collapse);
};
