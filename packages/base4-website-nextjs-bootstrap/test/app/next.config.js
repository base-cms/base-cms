const withSass = require('../../next-config');
const withBaseWebsite = require('@base-cms/base4-website-nextjs/next-config');
const path = require('path');

module.exports = withSass(withBaseWebsite({
  publicRuntimeConfig: {
    sectionRoutePrefix: '',
  },

  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, '../../src'),
      exclude: /node_modules/,
      use: defaultLoaders.babel
    })
    return config;
  },
}));
