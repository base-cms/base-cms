const { isURL } = require('validator');
const {
  bool,
  cleanEnv,
  makeValidator,
} = require('envalid');

const mongodsn = makeValidator((v) => {
  const opts = { protocols: ['mongodb'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a Mongo DSN string startng with mongodb://');
});

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  MONGO_DSN: mongodsn({ desc: 'The MongoDB DSN to connect to.' }),
  MONGO_LOGGING: bool({ desc: 'Whether to enable Mongo query logging to the terminal.', default: false }),
  TENANT_KEY: nonemptystr({ desc: 'The Base4 tenant to connect import from, e.g. cygnus_ofcr' }),
  ELASTIC_HOST: nonemptystr({ desc: 'The Elasticsearch host to connect to.' }),
});
