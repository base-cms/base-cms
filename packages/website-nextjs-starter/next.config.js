const withSass = require('@base-cms/website-nextjs-bootstrap/next-config');
const withBaseWebsite = require('@base-cms/website-nextjs/next-config');

module.exports = withSass(withBaseWebsite({
  distDir: '../.next/build',
  publicRuntimeConfig: {
    sectionRoutePrefix: '',
  },
}));
