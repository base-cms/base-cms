const {
  cleanEnv,
  num,
  port,
  str,
} = require('@base-cms/env');

module.exports = cleanEnv(process.env, {
  GRAPHQL_URI: str({ desc: 'The BaseCMS GraphQL URL.' }),
  EXPOSED_PORT: port({ desc: 'The external port that express is exposed on.', default: 80 }),
  PORT: port({ desc: 'The internal port that express will run on.', default: 80 }),
  TERMINUS_TIMEOUT: num({ desc: 'Number of milliseconds before forceful exiting.', default: 1000 }),
  TERMINUS_SHUTDOWN_DELAY: num({ desc: 'Number of milliseconds before the HTTP server starts its shutdown.', default: 10000 }),
});
