const { getFromRequest } = require('@base-cms/tenant-context');
const basedb = require('../basedb');

module.exports = (req, res, next) => {
  const { tenant } = getFromRequest(req);
  const host = req.get('x-website-host') || req.get('host');
  res.locals.basedb = basedb(tenant);
  res.locals.baseUri = `${req.protocol}://${host}`;
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Content-Type', 'text/xml');
  next();
};
