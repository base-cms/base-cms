const pump = require('pump');
const { dest, src } = require('gulp');
const completeTask = require('../utils/task-callback');

// @todo Add fingerprinting!
module.exports = cwd => (cb) => {
  pump([
    src('server/fonts/**/*.{ttf,woff,woff2,eot,svg}', { cwd }),
    dest('dist/fonts', { cwd }),
  ], e => completeTask(e, cb));
};
