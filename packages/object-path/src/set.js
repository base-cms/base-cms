const { set } = require('object-path');

module.exports = (obj, path, value) => set(obj, path, value);
