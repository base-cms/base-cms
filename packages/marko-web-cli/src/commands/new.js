const log = require('fancy-log');
const inquirer = require('inquirer');
const figlet = require('figlet');
const emptyDir = require('empty-dir');
const validatePackage = require('validate-npm-package-name');
const { existsSync } = require('fs');
const chalk = require('chalk');
const clear = require('../utils/clear');
const cwd = require('../utils/get-cwd');
const logError = require('../utils/log-error');
const exit = require('../utils/print-and-exit');

const name = 'new';
const desc = 'Create a new BaseCMS website project.';

const builder = (yargs) => {
  yargs.positional('path', {
    describe: 'A path (relative to the CWD) to create the project in',
    type: 'string',
  }).option('npm-org', {
    describe: 'Your NPM org name. Will prefix the package name.',
    type: 'string',
  });
};

const handler = ({ _, npmOrg }) => {
  const [, path] = _;
  if (!path) {
    exit('A project directory is required.');
  }
  const dir = cwd(path);
  if (existsSync(dir) && !emptyDir.sync(dir)) {
    exit(`The selected project directory is not empty. Tried installing in ${chalk.gray(dir)}`);
  }

  const questions = [
    {
      type: 'input',
      name: 'projectName',
      default: () => {
        if (npmOrg) return `@${npmOrg.replace('@', '')}/${path}`;
        return path;
      },
      message: chalk`Enter a project name. This will populate the {yellow name} field of the {yellow package.json} file.`,
      validate: (v) => {
        if (!v) return 'The project name is required.';
        const { validForNewPackages } = validatePackage(v);
        if (!validForNewPackages) return 'The project name is not a valid package.json name.';
        return true;
      },
      filter: v => (v ? String(v).trim() : v),
    },
  ];

  clear();

  // eslint-disable-next-line no-console
  console.log(chalk.blue(figlet.textSync('BaseCMS Website', { horizontalLayout: 'full' })));
  const execute = async () => {
    const answers = await inquirer.prompt(questions);

    const {
      projectName,
    } = answers;
    log('Install', chalk.yellow(projectName), 'into', chalk.gray(dir));
    process.exit(0);
  };

  execute().then(() => process.exit(0)).catch((e) => {
    logError(e);
    process.exit(1);
  });
};

module.exports = program => program.command(name, desc, builder, handler);
