const { envalid } = require('@base-cms/tooling');

const {
  custom,
  str,
  cleanEnv,
} = envalid;
const { natsdsn } = custom;

module.exports = cleanEnv(process.env, {
  NATS_DSN: natsdsn({ desc: 'The NATS DSN to connect to.' }),
  NATS_LOGLEVEL: str({
    desc: 'The log level to use for NATS messages',
    choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
    default: 'warn',
    devDefault: 'info',
  }),
});
