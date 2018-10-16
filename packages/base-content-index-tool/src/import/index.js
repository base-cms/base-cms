const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const clear = require('clear');
const env = require('../env');

const { log } = console;
const { TENANT } = env;

const questions = [
  {
    type: 'input',
    name: 'batchSize',
    default: 500,
    message: 'The batch size.',
    validate: (v) => {
      const num = parseInt(v, 10);
      if (!num || num < 1) {
        return 'Please provide a number greater than 0.';
      }
      return true;
    },
    filter: v => parseInt(v, 10),
  },
  {
    type: 'confirm',
    name: 'shouldRun',
    message: `Proceed with indexing for '${TENANT}'?`,
    default: true,
  },
];

clear();
log(chalk.blue(figlet.textSync('Content Indexer', { horizontalLayout: 'full' })));

const run = async () => {
  const answers = await inquirer.prompt(questions);

  const { shouldRun } = answers;
  if (shouldRun) {
    log('GO!');
  } else {
    log(chalk.green('Exiting import.'));
    process.exit(0);
  }
};

run().then(() => process.exit()).catch((e) => {
  log(chalk.red('AN ERROR OCCURRED!'));
  log(e);
  process.exit(1);
});
