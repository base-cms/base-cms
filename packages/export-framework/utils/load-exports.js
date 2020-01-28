const readdir = require('recursive-readdir');
const fs = require('fs');
const path = require('path');

let promise;

const load = async ({ rootDir, exportPath, coreConfig }) => {
  const exportDir = path.resolve(rootDir, exportPath);
  if (!fs.existsSync(exportDir)) throw new Error(`The directory ${exportDir} does not exist.`);

  const extensions = Object.keys(coreConfig.getAsObject('types'));
  const fileIgnore = new RegExp(`/((?!.*.(${extensions.join('|')}).js).)$`, 'g');
  const fileMatch = new RegExp(`/.*.(${extensions.join('|')}).js$`);

  const files = await readdir(exportDir, [f => fileIgnore.test(f)]);
  const filtered = files.filter(filename => fileMatch.test(filename));

  return filtered.map((filename) => {
    const { groups: { filepath, format } } = /(?<filepath>.*)\.(?<format>.*)\.js/.exec(filename);
    const route = `${filepath.replace(exportDir, '')}.${format}`;
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
      name: key.replace('core/', ''),
      ...(siteMatch && {
        site: siteMatch.groups.site,
        name: key.replace(`site/${siteMatch.groups.site}/`, ''),
      }),
    };
  });
};

module.exports = ({ rootDir, exportPath, coreConfig }) => {
  if (!promise) promise = load({ rootDir, exportPath, coreConfig });
  return promise;
};
