const { routes } = require('@base-cms/base4-website-nextjs/routing');

routes.add({
  name: 'home',
  pattern: '/',
  page: 'index',
}).add({
  name: 'section',
  pattern: '/section/:alias(.*)',
  page: 'section',
}).add({
  name: 'page',
  pattern: '/page/:alias',
  page: 'page',
}).add({
  name: 'content',
  pattern: '/:prefix(.*):id(\\d{8}):suffix(.*)',
  page: 'content',
});
