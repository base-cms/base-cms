const proxy = require('express-http-proxy');

const SITEMAP_SERVICE_URI = process.env.SITEMAP_SERVICE_URI || 'http://sitemaps';

module.exports = app => app.use('/sitemap', proxy(SITEMAP_SERVICE_URI));
