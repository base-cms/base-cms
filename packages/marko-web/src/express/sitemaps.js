const proxy = require('express-http-proxy');

module.exports = app => app.use('/sitemap', proxy('sitemap-handler'));
