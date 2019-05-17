const slugFn = require('slug');

module.exports = value => slugFn(value).toLowerCase();
