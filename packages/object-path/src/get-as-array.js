const { get } = require('object-path');
const { asArray } = require('@base-cms/utils');

module.exports = (obj, path) => asArray(get(obj, path, []));
