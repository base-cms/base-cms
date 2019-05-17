const pump = require('pump');
const revall = require('gulp-rev-all');
const del = require('gulp-rev-delete-original');
const { dest, src } = require('gulp');
const path = require('path');
const completeTask = require('../utils/task-callback');

module.exports = cwd => (cb) => {
  pump([
    src('dist/**/*', { cwd }),
    revall.revision({
      includeFilesInManifest: ['.css', '.js'],
      transformFilename: (file, hash) => {
        const basename = path.basename(file.path);
        const mapname = path.basename(file.path, '.map');
        const prefix = basename === mapname
          ? path.basename(mapname, path.extname(file.path))
          : path.basename(mapname, path.extname(mapname));
        const suffix = basename.replace(prefix, '');
        return `${prefix}.${hash.substr(0, 8)}${suffix}`;
      },
    }),
    del(),
    dest('dist', { cwd }),
    revall.manifestFile(),
    dest('dist', { cwd }),
  ], e => completeTask(e, cb));
};
