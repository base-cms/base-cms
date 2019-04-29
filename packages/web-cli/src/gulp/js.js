/* eslint-disable global-require */
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const pump = require('pump');
const webpack = require('webpack-stream');
const wp = require('webpack');
const { dest, src } = require('gulp');
const { getIfUtils } = require('webpack-config-utils');
const completeTask = require('../utils/task-callback');

const absoluteRuntime = path.dirname(require.resolve('@babel/runtime/package.json'));

// @todo Determine how to combine CSS with the main CSS build
// @todo Add sass to Vue components
// @todo Add default polyfills to entry point
module.exports = cwd => (cb) => {
  const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV);
  pump([
    src('browser/index.js', { cwd }),
    webpack({
      mode: ifProduction('production', 'development'),
      cache: ifNotProduction(),
      devtool: 'source-map',
      output: {
        library: 'CMSBrowserComponents',
        libraryExport: 'default',
        libraryTarget: 'umd',
        filename: 'index.[chunkhash:8].js',
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: require.resolve('vue-loader'),
          },
          {
            test: /\.js$/,
            loader: require.resolve('babel-loader'),
            exclude: file => (
              /node_modules/.test(file)
              && !/\.vue\.js/.test(file)
            ),
            options: {
              presets: [
                [
                  require.resolve('@babel/preset-env'),
                  {
                    modules: false,
                    useBuiltIns: 'usage',
                    corejs: 2,
                    targets: {
                      browsers: [
                        'Chrome >= 49',
                        'Firefox >= 45',
                        'Safari >= 10',
                        'Edge >= 12',
                        'Explorer >= 11',
                        'iOS >= 10',
                      ],
                    },
                    loose: false,
                  },
                ],
              ],
              plugins: [
                [
                  require.resolve('@babel/plugin-transform-runtime'),
                  {
                    regenerator: false,
                    corejs: 2,
                    helpers: true,
                    useESModules: false,
                    absoluteRuntime,
                  },
                ],
              ],
            },
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('vue-style-loader'),
              require.resolve('css-loader'),
            ],
          },
        ],
      },
      plugins: [
        new VueLoaderPlugin(),
        new ManifestPlugin({
          fileName: 'asset-manifest.json',
          publicPath: '/dist/',
          filter: ({ name }) => /\.js$/.test(name),
        }),
      ],
      // @todo Explore splitting vendor code vs. core website code vs. userland website code
      // optimization: {
      //   splitChunks: {
      //     cacheGroups: {
      //       commons: {
      //         test: /[\\/]node_modules[\\/]/,
      //         name: 'vendor',
      //         chunks: 'initial',
      //       },
      //     },
      //   },
      // },
    }, wp),
    dest('dist', { cwd }),
  ], e => completeTask(e, cb));
};
