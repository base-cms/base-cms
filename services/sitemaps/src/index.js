const micro = require('micro');

const { retrieve, generate } = require('./middleware');

const server = micro(async (req, res) => {
  if (/^\/sitemap(.xml|-google-news.xml|\/.+.xml)$/.test(req.url)) return retrieve(res, req.url);
  if (/^\/generate($|\/(index$|sections$|content$))/.test(req.url)) return generate(res, req.url);
  throw micro.createError(404, 'Not found');
});

server.listen(80);
