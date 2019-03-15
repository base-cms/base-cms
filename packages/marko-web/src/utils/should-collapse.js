module.exports = (collapse) => {
  if (collapse === 'false' || collapse === false) return false;
  if (!collapse) return true;
  return Boolean(collapse);
};
