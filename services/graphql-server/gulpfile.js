const gulpfile = require('../../gulpfile');

gulpfile({
  entry: 'src/index.js',
  lintPaths: ['src/**/*.js'],
  watchPaths: [
    'src/**/*.js',
    '../../pacakges/graphql/src/**/*.graphql',
    '../../packages/graphql/src/**/*.js',
  ],
});
