const pump = require('pump');
const revall = require('gulp-rev-all');
const del = require('gulp-rev-delete-original');
const { dest, src } = require('gulp');
const { basename, extname } = require('path');
const completeTask = require('../utils/task-callback');

module.exports = cwd => (cb) => {
  pump([
    src('dist/css/*', { cwd }),
    revall.revision({
      fileNameManifest: 'manifest.json',
      includeFilesInManifest: ['.css'],
      transformFilename: (file, hash) => {
        const base = basename(file.path);
        const mapname = basename(file.path, '.map');
        const prefix = base === mapname
          ? basename(mapname, extname(file.path))
          : basename(mapname, extname(mapname));
        const suffix = base.replace(prefix, '');
        return `${prefix}.${hash.substr(0, 8)}${suffix}`;
      },
    }),
    del(),
    dest('dist/css', { cwd }),
    revall.manifestFile(),
    dest('dist/css', { cwd }),
  ], e => completeTask(e, cb));
};
