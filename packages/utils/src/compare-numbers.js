module.exports = (op, left, right, force) => {
  const l = force ? Number(left) : left;
  const r = force ? Number(right) : right;
  switch (op) {
    case 'gt':
      return l > r;
    case 'lt':
      return l < r;
    case 'gte':
      return l >= r;
    case 'lte':
      return l <= r;
    default:
      return false;
  }
};
