module.exports = (req, res, next) => {
  res.locals.host = req.get('x-website-host') || req.get('host');
  res.locals.baseUri = `${req.protocol}://${res.locals.host}`;
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf8');
  next();
};
