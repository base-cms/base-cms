const createClient = require('./create-client');

module.exports = (uri, config) => (req, res, next) => {
  const apollo = createClient(uri, config);
  req.apollo = apollo;
  res.locals.apollo = apollo;
  next();
};
