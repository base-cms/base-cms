const { EnvironmentPlugin } = require('webpack');

module.exports = (nextConfig = {}) => Object.assign({}, nextConfig, {
  /**
   *
   */
  publicRuntimeConfig: {
    sectionRoutePrefix: 'section',
    ...nextConfig.publicRuntimeConfig,
  },

  /**
   *
   * @param {*} config
   * @param {*} options
   */
  webpack(config, options) {
    config.plugins.push(new EnvironmentPlugin(['NODE_ENV']));

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options);
    }
    return config;
  },
});
