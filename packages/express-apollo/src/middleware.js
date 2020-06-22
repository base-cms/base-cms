const createClient = require('@base-cms/apollo-client/create-client');

module.exports = (uri, config, linkConfig) => (req, res, next) => {
  const apollo = createClient(uri, config, linkConfig);
  req.apollo = apollo;
  res.locals.apollo = apollo;
  next();
};
