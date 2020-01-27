module.exports = (output, { format, coreConfig }) => {
  const formatter = coreConfig.get(`types.${format}.formatter`);
  return formatter(output);
};
