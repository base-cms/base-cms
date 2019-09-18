const { get } = require('object-path');

module.exports = (obj, path, def) => get(obj, path, def);
