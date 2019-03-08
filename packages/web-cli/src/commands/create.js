const chalk = require('chalk');
const emptyDir = require('empty-dir');
const figlet = require('figlet');
const inquirer = require('inquirer');
const { existsSync } = require('fs');

const clear = require('../utils/clear');
const cwd = require('../utils/get-cwd');
const exit = require('../utils/print-and-exit');
const generateProject = require('../generator');
const loadQuestions = require('./create/questions');

module.exports = ({ _, npmOrg }) => {
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
    const { proceed } = answers;
    if (!proceed) {
      exit(chalk`Installation {red stopped}`, 0);
    }
    return generateProject(dir, answers);
  };

  execute().then(() => {
    exit(chalk`{green Installation complete!}`, 0);
  }).catch((e) => {
    exit(e.message);
  });
};
