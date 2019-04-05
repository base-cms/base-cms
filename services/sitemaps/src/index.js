const micro = require('micro');

const { retrieve, generate, googleNews } = require('./routes');

const server = micro(async (req, res) => {
  if (req.url === '/sitemap-google-news.xml') return googleNews(res);
  if (/^\/sitemap(?:.*).xml$/.test(req.url)) return retrieve(res, req.url);
  if (/^\/generate($|\/(index$|sections$|content$))/.test(req.url)) return generate(res, req.url);
  throw micro.createError(404, 'Not found');
});

server.listen(80);
