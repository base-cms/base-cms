const { DefinePlugin } = require('webpack');

module.exports = (nextConfig = {}) => Object.assign({}, nextConfig, {
  /**
   *
   * @param {*} config
   * @param {*} options
   */
  webpack(config, options) {
    config.plugins.push(new DefinePlugin({
      CONTENT_CANONICAL_PATHS: JSON.stringify(['sectionAlias', 'type', 'id', 'slug'])
    }));

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
