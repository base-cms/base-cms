const gulpfile = require('../../gulpfile');

gulpfile({
  entry: 'src/index.js',
  lintPaths: ['src/**/*.js'],
  watchPaths: ['src/**/*.js', '../graphql/src/**/*.graphql', '../graphql/src/**/*.js'],
});
