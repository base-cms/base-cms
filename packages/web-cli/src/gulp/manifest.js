const pump = require('pump');
const revall = require('gulp-rev-all');
const del = require('gulp-rev-delete-original');
const { dest, src } = require('gulp');
const completeTask = require('../utils/task-callback');

module.exports = cwd => (cb) => {
  pump([
    src('dist/**/*', { cwd }),
    revall.revision({ includeFilesInManifest: ['.css', '.js'] }),
    del(),
    dest('dist', { cwd }),
    revall.manifestFile(),
    dest('dist', { cwd }),
  ], e => completeTask(e, cb));
};
