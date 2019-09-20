const pump = require('pump');
const revall = require('gulp-rev-all');
const del = require('gulp-rev-delete-original');
const { dest, src } = require('gulp');
const { basename, extname } = require('path');
const completeTask = require('../utils/task-callback');

module.exports = cwd => (cb) => {
  pump([
    src('dist/**/*', { cwd }),
    revall.revision({
      includeFilesInManifest: ['.css', '.js'],
      transformFilename: (file, hash) => {
        const base = basename(file.path);
        const mapname = basename(file.path, '.map');
        const prefix = base === mapname
          ? basename(mapname, extname(file.path))
          : basename(mapname, extname(mapname));
        const suffix = base.replace(prefix, '');
        return `${prefix}.${hash.substr(0, 8)}${suffix}`;
      },
      annotator: (contents, path) => ([{ contents, path }]), // provide file path.
      replacer: (fragment, replaceRegExp, newReference) => {
        // Prevent replacing generic "index" values.
        if (`${replaceRegExp}` !== '/(\'|")(index)()(\'|"|$)/g') {
          // eslint-disable-next-line no-param-reassign
          fragment.contents = fragment.contents.replace(replaceRegExp, `$1${newReference}$3$4`);
        }
      },
    }),
    del(),
    dest('dist', { cwd }),
    revall.manifestFile(),
    dest('dist', { cwd }),
  ], e => completeTask(e, cb));
};
