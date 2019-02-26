const { get } = require('object-path');
const { asObject } = require('@base-cms/utils');

module.exports = (obj, path) => asObject(get(obj, path, {}));
