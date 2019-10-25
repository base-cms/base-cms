const { NEW_RELIC_ENABLED } = require('./env');

process.env.NEW_RELIC_ENABLED = NEW_RELIC_ENABLED;

module.exports = require('newrelic');
