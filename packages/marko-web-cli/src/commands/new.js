const log = require('fancy-log');
const inquirer = require('inquirer');
const figlet = require('figlet');
const emptyDir = require('empty-dir');
const { existsSync } = require('fs');
const chalk = require('chalk');
const loadQuestions = require('./new/questions');
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

  const questions = loadQuestions({ path, npmOrg });

  clear();

  // eslint-disable-next-line no-console
  console.log(chalk.blue(figlet.textSync('BaseCMS Website', { horizontalLayout: 'full' })));
  const execute = async () => {
    const answers = await inquirer.prompt(questions);

    const {
      projectName,
      proceed,
    } = answers;
    if (proceed) {
      log('Installing ', chalk.cyan(projectName), '...');
    } else {
      log('Installation', chalk.red('stopped'));
    }
    process.exit(0);
  };

  execute().then(() => process.exit(0)).catch((e) => {
    logError(e);
    process.exit(1);
  });
};

module.exports = program => program.command(name, desc, builder, handler);
