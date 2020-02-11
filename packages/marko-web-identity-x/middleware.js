const IdentityX = require('./service');

/**
 * An Express middleware that injects the IdentityX service.
 *
 * @param {IdentityXConfiguration} config The IdentityX config object
 * @returns {function} The middleware function
 */
module.exports = config => (req, res, next) => {
  const service = new IdentityX({ req, res, config });
  req.identityX = service;
  res.locals.identityX = service;
  next();
};
