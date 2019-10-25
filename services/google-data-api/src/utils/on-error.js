const newrelic = require('../newrelic');

module.exports = e => newrelic.noticeError(e);
