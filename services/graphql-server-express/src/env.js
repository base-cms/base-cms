const { envalid } = require('@base-cms/tooling');

const {
  custom,
  str,
  port,
  cleanEnv,
} = envalid;
const { natsdsn } = custom;

module.exports = cleanEnv(process.env, {
  BASECMS_GRAPHQL_PORT: port({ desc: 'The port to run the GraphQL server on.', default: 6915 }),
  BASECMS_GRAPHQL_HOST: str({ desc: 'The host to run the GraphQL server on.', default: 'localhost' }),
  NATS_DSN: natsdsn({ desc: 'The NATS DSN to connect to.' }),
  NATS_LOGLEVEL: str({
    desc: 'The log level to use for NATS messages',
    choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
    default: 'warn',
    devDefault: 'info',
  }),
});
