const pump = require('pump');
const rev = require('gulp-rev');
const del = require('gulp-rev-delete-original');
const { dest, src } = require('gulp');
const completeTask = require('../utils/task-callback');

module.exports = cwd => (cb) => {
  pump([
    rev(),
    src('dist/**/*', { cwd }),
    del(),
    dest('dist', { cwd }),
    rev.manifest(),
    dest('dist', { cwd }),
  ], e => completeTask(e, cb));
};
