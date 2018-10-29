module.exports = [
  {
    name: 'home',
    pattern: '/',
    page: 'index',
  },
  {
    name: 'section',
    pattern: '/section/:alias(.*)',
    page: 'section',
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
];
