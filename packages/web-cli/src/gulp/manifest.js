const pump = require('pump');
const rev = require('gulp-rev');
const { dest, src } = require('gulp');
const completeTask = require('../utils/task-callback');

module.exports = cwd => (cb) => {
  pump([
    src('dist/tmp/**/*', { cwd }),
    rev(),
    dest('dist', { cwd }),
    rev.manifest(),
    dest('dist', { cwd }),
  ], e => completeTask(e, cb));
};
