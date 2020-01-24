const readdir = require('recursive-readdir');
const fs = require('fs');
const path = require('path');

let promise;

const load = async ({ rootDir, exportPath }) => {
  const exportDir = path.resolve(rootDir, exportPath);
  if (!fs.existsSync(exportDir)) throw new Error(`The directory ${exportDir} does not exist.`);

  const files = await readdir(exportDir, [f => /\/((?!.*\.(indtt|json|csv|xml)\.js).)$/g.test(f)]);
  return files.map((filename) => {
    const { groups: { filepath, format } } = /(?<filepath>.*)\.(?<format>.*)\.js/.exec(filename);
    const route = filepath.replace(exportDir, '').replace(`.${format}.js`, '');
    const siteMatch = /site\/(?<site>.*)\//.exec(route);
    const key = route.replace(/^\//, '');
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const fn = require(filename);
    return {
      key,
      route,
      format,
      filename,
      fn,
      name: `${key.replace('core/', '')}.${format}`,
      ...(siteMatch && {
        site: siteMatch.groups.site,
        name: `${key.replace(`site/${siteMatch.groups.site}/`, '')}.${format}`,
      }),
    };
  });
};

module.exports = ({ rootDir, exportPath }) => {
  if (!promise) promise = load({ rootDir, exportPath });
  return promise;
};
