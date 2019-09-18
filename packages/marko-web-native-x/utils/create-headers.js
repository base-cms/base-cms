module.exports = ({ req }) => {
  if (!req) return {};
  return {
    'x-forwarded-for': req.ip,
    'user-agent': req.get('user-agent'),
  };
};
