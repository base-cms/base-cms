const { get } = require('object-path');

module.exports = (obj, path, def = null) => get(obj, path, def);
