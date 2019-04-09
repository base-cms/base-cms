const { envalid } = require('@base-cms/tooling');

const { custom, cleanEnv, str } = envalid;
const { nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: nonemptystr({ desc: 'The Base MongoDB connection URL.' }),
  TENANT_KEY: nonemptystr({ desc: 'The Base tenant key to connect to, e.g. cygnus_ofcr' }),
  AWS_S3_BUCKET: nonemptystr({ desc: 'The S3 URI for the root of stored sitemap files.' }),
  AWS_S3_PREFIX: str({ desc: 'The S3 object path prefix (bucket-name/prefix/[objects])', default: '' }),
  AWS_S3_REGION: nonemptystr({ desc: 'The S3 region', default: 'us-east-1' }),
  AWS_ACCESS_KEY_ID: nonemptystr({ desc: 'The access key for reading the s3 bucket' }),
  AWS_SECRET_ACCESS_KEY: nonemptystr({ desc: 'The secret key for reading the s3 bucket' }),
  GOOGLE_NEWS_PUBLICATION: nonemptystr({ desc: 'The Google News publisher name' }),
});
