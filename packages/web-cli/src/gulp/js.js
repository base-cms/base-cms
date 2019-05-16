/* eslint-disable global-require */
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const pump = require('pump');
const webpack = require('webpack-stream');
const wp = require('webpack');
const { dest, src } = require('gulp');
const { getIfUtils } = require('webpack-config-utils');
const { existsSync } = require('fs');
const { join } = require('path');
const completeTask = require('../utils/task-callback');

const absoluteRuntime = path.dirname(require.resolve('@babel/runtime/package.json'));

/**
 * Loads an RC file from the CWD, if present, to provide gulp configuration
 * @param {String} cwd The current directory
 */
const readRcFile = (cwd) => {
  const excludeFn = file => (
    /node_modules/.test(file)
    && !/packages\/marko-web\/browser/.test(file)
    && !/\.vue\.js/.test(file)
  );

  const defaultTargets = {
    browsers: [
      'Chrome >= 49',
      'Firefox >= 45',
      'Safari >= 10',
      'Edge >= 12',
      'Explorer >= 11',
      'iOS >= 10',
    ],
  };

  // eslint-disable-next-line import/no-dynamic-require
  const rc = existsSync(join(cwd, '.basecmsrc.js')) ? require(join(cwd, '.basecmsrc.js')) : {};
  const exclude = rc && rc.babelLoader && typeof rc.babelLoader.exclude === 'function'
    ? rc.babelLoader.exclude : excludeFn;

  const targets = rc && rc.babelLoader && rc.babelLoader.targets
    ? rc.babelLoader.targets : defaultTargets;

  const debug = rc && rc.babelLoader && typeof rc.babelLoader.debug === 'boolean'
    ? rc.babelLoader.debug : false;

  return { exclude, targets, debug };
};

// @todo Determine how to combine CSS with the main CSS build
// @todo Add sass to Vue components
// @todo Add default polyfills to entry point
module.exports = cwd => (cb) => {
  const { exclude, targets, debug } = readRcFile(cwd);
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
            exclude,
            options: {
              presets: [
                [
                  require.resolve('@babel/preset-env'),
                  {
                    modules: false,
                    useBuiltIns: false,
                    targets,
                    loose: false,
                    debug,
                  },
                ],
              ],
              plugins: [
                [
                  require.resolve('@babel/plugin-transform-runtime'),
                  {
                    regenerator: true,
                    corejs: false,
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
    dest('dist/tmp', { cwd }),
  ], e => completeTask(e, cb));
};
