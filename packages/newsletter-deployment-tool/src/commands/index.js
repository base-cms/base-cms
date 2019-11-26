const notify = require('./notify');
const deploy = require('./deploy');

module.exports = (yargs) => {
  notify(yargs);
  deploy(yargs);
};
