const { isURL } = require('validator');
const { makeValidator } = require('envalid');

const natsdsn = makeValidator((v) => {
  const opts = { protocols: ['nats'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a NATS DSN string with nats://');
});

const url = makeValidator((v) => {
  const opts = { protocols: ['http', 'https'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a valid URL with http or https');
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

const mongodsn = makeValidator((v) => {
  const opts = { protocols: ['mongodb'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a Mongo DSN string startng with mongodb://');
});

module.exports = {
  natsdsn,
  url,
  nonemptystr,
  mongodsn,
};
