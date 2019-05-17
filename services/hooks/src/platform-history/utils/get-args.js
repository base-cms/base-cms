module.exports = () => {
  const [, , stack, tenant] = process.argv;
  return { stack, tenant };
};
