const proxy = require('express-http-proxy');

const SERVICE_URI = process.env.SITEMAP_SERVICE_URI;
if (!SERVICE_URI) throw new Error('Missing required environment variable: SITEMAP_SERVICE_URI.');

module.exports = app => app.use('/sitemap', proxy(SERVICE_URI));
