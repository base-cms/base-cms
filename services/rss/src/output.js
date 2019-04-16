const env = require('./env');

const { NODE_ENV } = env;

module.exports = {
  log(message, allowOnTest = false) {
    if (NODE_ENV !== 'test' || allowOnTest) {
      process.stdout.write(`${message}\n`);
    }
  },
};
