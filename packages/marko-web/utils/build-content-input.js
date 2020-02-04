module.exports = ({ req }) => {
  const input = {};
  if (req.cookies['preview-mode'] || req.query['preview-mode']) {
    input.status = 'any';
  } else {
    input.since = Date.now();
  }
  return input;
};
