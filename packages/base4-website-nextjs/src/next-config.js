module.exports = (nextConfig = {}) => Object.assign({}, nextConfig, {
  /**
   *
   * @param {*} config
   * @param {*} options
   */
  webpack(config, options) {
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
