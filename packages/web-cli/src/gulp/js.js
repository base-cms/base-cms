/* eslint-disable global-require */
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const pump = require('pump');
const webpack = require('webpack-stream');
const wp = require('webpack');
const { dest, src } = require('gulp');
const completeTask = require('../utils/task-callback');

const absoluteRuntime = path.dirname(require.resolve('@babel/runtime/package.json'));

// @todo Add fingerprinting!
// @todo Determine how to combine CSS with the main CSS build
// @todo Add sass to Vue components
// @todo Add default polyfills to entry point
module.exports = cwd => (cb) => {
  pump([
    src('client/index.js', { cwd }),
    webpack({
      mode: process.env.NODE_ENV,
      output: {
        library: 'BaseCMS',
        libraryTarget: 'window',
        filename: 'index.js',
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
                        'Edge >= 13',
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
      ],
    }, wp),
    dest('dist', { cwd }),
  ], e => completeTask(e, cb));
};
