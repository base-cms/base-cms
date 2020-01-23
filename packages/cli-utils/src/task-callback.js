const logError = require('./log-error');

module.exports = (e, cb) => {
  if (e) {
    logError(e);
    process.exit(1);
  } else {
    cb();
  }
};
