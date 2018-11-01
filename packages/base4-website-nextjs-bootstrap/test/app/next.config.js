const withSass = require('../../next-config');
const withBaseWebsite = require('@base-cms/base4-website-nextjs/next-config');

module.exports = withSass(withBaseWebsite({
  publicRuntimeConfig: {
    sectionRoutePrefix: '',
  },
}));
