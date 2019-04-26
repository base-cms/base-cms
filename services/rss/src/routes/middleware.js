const { getFromRequest } = require('@base-cms/tenant-context');
const basedb = require('../basedb');

module.exports = (req, res, next) => {
  const { tenant } = getFromRequest(req);
  res.locals.basedb = basedb(tenant);
  res.locals.host = req.get('x-website-host') || req.get('host');
  res.locals.baseUri = `${req.protocol}://${res.locals.host}`;
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf8');
  next();
};
