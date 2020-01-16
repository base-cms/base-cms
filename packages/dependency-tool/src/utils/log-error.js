const log = require('fancy-log');
const { red } = require('chalk');

module.exports = (e) => {
  if (e) log.error(red('ERROR:'), e.stack);
};
