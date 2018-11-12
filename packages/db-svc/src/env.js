const { isURL } = require('validator');
const { str, cleanEnv, makeValidator } = require('envalid');

const natsdsn = makeValidator((v) => {
  const opts = { protocols: ['nats'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a NATS DSN string with nats://');
});

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
