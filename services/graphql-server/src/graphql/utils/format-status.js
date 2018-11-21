module.exports = (status) => {
  if (status === 'active') return { status: 1 };
  return {};
};
