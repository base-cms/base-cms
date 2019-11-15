const IdentityX = require('./service');
/**
 * An Express middleware that injects the IdentityX service
 */
module.exports = config => (req, res, next) => {
  const service = new IdentityX({ req, res, appId: config.getAppId() });
  req.identityX = service;
  res.locals.identityX = service;
  next();
};
