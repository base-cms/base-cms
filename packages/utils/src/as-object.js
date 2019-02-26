const isObject = require('./is-object');

module.exports = v => (isObject(v) ? v : {});
