const log = require('fancy-log');
const { red } = require('chalk');

module.exports = (message, code = 1) => {
  if (code === 0) {
    log(message);
  } else {
    log.error(red('ERROR:'), message);
  }
  process.exit(code);
};
