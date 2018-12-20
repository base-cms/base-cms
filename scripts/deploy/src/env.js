const { makeValidator, cleanEnv } = require('envalid');
const { isURL } = require('validator');

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

module.exports = cleanEnv(process.env, {
  RANCHER_URI: url(),
  RANCHER_ACCESS_KEY: nonemptystr(),
  RANCHER_SECRET_KEY: nonemptystr(),
  SERVICE_TARGET: nonemptystr({ desc: 'The service label value to search for' }),
  IMAGE_NAME: nonemptystr({ desc: 'The image to deploy' }),
  TRAVIS_TAG: nonemptystr({ desc: 'The version to deploy' }),
});
