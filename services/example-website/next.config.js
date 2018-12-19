const withBaseWebsite = require('@base-cms/nextjs-web/next-config');

module.exports = withBaseWebsite({
  distDir: '../.next/build',
  publicRuntimeConfig: {
    sectionRoutePrefix: '',
  },
});
