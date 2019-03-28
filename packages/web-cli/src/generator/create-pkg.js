const { version, name, dependencies } = require('../../package.json');
const objectPathPkg = require('../../../object-path/package.json');

const sortDeps = deps => Object.keys(deps).sort().reduce((o, k) => ({ ...o, [k]: deps[k] }), {});

module.exports = ({ projectName, withBootstrap }) => {
  const markoWebVersion = dependencies['@base-cms/marko-web'];
  if (!markoWebVersion) throw new Error('Unable to obtain web package version from dependencies.');

  const deps = {
    [name]: `~${version}`,
    '@base-cms/marko-web': `~${markoWebVersion.replace('^', '')}`,
    '@base-cms/object-path': `^${objectPathPkg.version}`,
    graphql: '^14.1.1',
    'graphql-tag': '^2.10.1',
  };
  if (withBootstrap) {
    deps.bootstrap = '4.3.1';
  }

  const pkg = {
    name: projectName,
    version: '0.0.0',
    private: true,
    scripts: {
      dev: 'basecms-website dev index.js',
      build: 'basecms-website build',
      lint: 'basecms-website lint',
    },
    dependencies: sortDeps(deps),
  };
  return pkg;
};
