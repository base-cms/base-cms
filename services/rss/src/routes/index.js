const createError = require('http-errors');
const websiteScheduledContent = require('./website-scheduled-content');

const parseJson = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

const rss = () => (req, res, next) => {
  const { websiteContext: website } = res.locals;
  const { query } = req;
  if (!query.input) throw createError(400, 'No input was provided with the request.');
  const input = parseJson(query.input);
  const channel = parseJson(query.channel);
  if (!input) throw createError(400, 'The provided input is invalid.');
  res.locals.input = { ...input, pagination: { limit: 25, ...input.pagination } };
  res.locals.channel = channel || {};

  const mountPoint = req.get('x-mount-point') || '/__rss';
  res.locals.mountHref = `${website.origin}${mountPoint}${req.url}`;

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  next();
};

module.exports = (app) => {
  app.get('/website-scheduled-content.xml', rss(), websiteScheduledContent);
};
