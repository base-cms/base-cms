const {
  parallel,
} = require('gulp');
const css = require('./css');

module.exports = cwd => parallel(css(cwd));
