const { EnvironmentPlugin } = require('webpack');

module.exports = (nextConfig = {}) => Object.assign({}, nextConfig, {
  /**
   *
   * @param {*} config
   * @param {*} options
   */
  webpack(config, options) {
    config.plugins.push(new EnvironmentPlugin(['CONTENT_CANONICAL_PATHS', 'NODE_ENV']));

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
