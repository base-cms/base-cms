module.exports = (width, ar) => {
  const [x, y] = ar.split(':');
  const r = x / y;
  return Math.round(width / r);
};
