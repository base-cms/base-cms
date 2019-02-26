const createClient = require('./create-client');

module.exports = config => (req, res, next) => {
  const apollo = createClient(config);
  req.apollo = apollo;
  res.locals.apollo = apollo;
  next();
};
