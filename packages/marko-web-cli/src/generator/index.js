const chalk = require('chalk');
const log = require('fancy-log');

module.exports = async (dir, answers) => {
  const { projectName } = answers;
  log(chalk`Installing {cyan ${projectName}} into {dim ${dir}} ...`);
};
