const { get } = require('@base-cms/object-path');

module.exports = (to, path) => get(to, path || 'canonicalPath');
