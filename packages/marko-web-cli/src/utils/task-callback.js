const logError = require('./log-error');

module.exports = (e, cb) => {
  if (e) {
    logError(e);
  } else {
    cb();
  }
};
