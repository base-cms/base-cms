const log = require('fancy-log');
const { blue, gray } = require('chalk');

module.exports = (name, cwd) => {
  log(`Running '${blue(name)}' command in '${gray(cwd)}'`);
};
