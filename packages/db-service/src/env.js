const { envalid } = require('@base-cms/tooling');

const {
  custom,
  str,
  cleanEnv,
} = envalid;
const { natsdsn } = custom;

module.exports = cleanEnv(process.env, {
  BASECMS_MONGODB_URL: str({ desc: 'The Base MongoDB connection URL.' }),
  NATS_DSN: natsdsn({ desc: 'The NATS DSN to connect to.' }),
  NATS_LOGLEVEL: str({
    desc: 'The log level to use for NATS messages',
    choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace'],
    default: 'warn',
    devDefault: 'info',
  }),
});
