module.exports = ({ prefix, inc = Math.floor(Math.random() * 1000) }) => {
  const id = `${Date.now()}-${inc}`;
  if (!prefix) return id;
  return `${prefix}-${id}`;
};
