const { get } = require('object-path');

module.expports = (obj, path, def = null) => get(obj, path, def);
