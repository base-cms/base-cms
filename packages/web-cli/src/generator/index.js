const chalk = require('chalk');
const log = require('fancy-log');
const { version, name } = require('../../package.json');

module.exports = async (dir, answers) => {
  const { projectName } = answers;
  console.log(answers);
  log(chalk`Installing {cyan ${projectName}} into {dim ${dir}} ...`);

  const pkg = {
    name: projectName,
    version: '0.0.0',
    private: true,
    scripts: {
      dev: 'basecms-website dev index.js',
      build: 'basecms-website build',
      lint: 'basecms-website lint',
    },
    dependencies: {
      [name]: version,
      '@base-cms/marko-web': version,
      '@base-cms/object-path': '^0.4.0',
    },
  };
};
