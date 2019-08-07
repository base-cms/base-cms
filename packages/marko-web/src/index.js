const startServer = require('./start-server');

/**
 * @deprecated Future sites should use
 *             `const startServer = require('@base-cms/marko-web/start-server');`
 *             instead of
 *             `const { startServer } = require('@base-cms/marko-web');`
 */
module.exports = {
  startServer,
};
