const { envalid } = require('@base-cms/tooling');

const {
  custom,
  cleanEnv,
  bool,
  num,
} = envalid;
const { nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: nonemptystr({ desc: 'The Base MongoDB connection URL.' }),
  TENANT_KEY: nonemptystr({ desc: 'The Base tenant key to connect to, e.g. cygnus_ofcr' }),
  ENABLE_BASEDB_LOGGING: bool({ desc: 'Whether the BaseDB instance should log to the console.', default: false }),
  PAGE_SIZE: num({ desc: 'The number of urls per page', default: 25 }),
});
