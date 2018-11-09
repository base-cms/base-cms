module.exports = [
  {
    name: 'home',
    pattern: '/',
    page: 'index',
  },
  {
    name: 'page',
    pattern: '/page/:alias',
    page: 'page',
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
