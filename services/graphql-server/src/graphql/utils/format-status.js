module.exports = (status) => {
  if (status === 'active') return { status: 1 };
  if (status === 'deleted') return { status: 0 };
  return {};
};
