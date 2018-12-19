module.exports = [
  {
    name: 'home',
    pattern: '/',
    page: 'index',
  },
  // @todo Remove me.
  {
    name: 'test',
    pattern: '/test',
    page: 'test',
  },
  {
    name: 'page',
    pattern: '/page/:alias',
    page: 'page',
  },
  {
    name: 'content-article',
    pattern: '/:prefix(.*)/:type(article)/:id(\\d{8}):suffix(.*)',
    page: 'content/article',
  },
  {
    name: 'content-news',
    pattern: '/:prefix(.*)/:type(news)/:id(\\d{8}):suffix(.*)',
    page: 'content/news',
  },
  {
    name: 'content',
    pattern: '/:prefix(.*):id(\\d{8}):suffix(.*)',
    page: 'content',
  },
  {
    name: 'section',
    pattern: '/:alias(.*)',
    page: 'section',
  },
];
