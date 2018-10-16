const { isURL } = require('validator');
const {
  cleanEnv,
  makeValidator,
} = require('envalid');

const mongodsn = makeValidator((v) => {
  const opts = { protocols: ['mongodb'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a Mongo DSN string startng with mongodb://');
});

module.exports = cleanEnv(process.env, {
  MONGO_DSN: mongodsn({ desc: 'The MongoDB DSN to connect to.' }),
});
