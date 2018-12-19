const withWebsite = require('@base-cms/nextjs-web/next-config');
const withSass = require('@base-cms/nextjs-web-bootstrap/next-config');

module.exports = withSass(withWebsite({
  distDir: '../.next/build',
  publicRuntimeConfig: {
    sectionRoutePrefix: '',
  },
}));
