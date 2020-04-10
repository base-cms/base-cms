const { cleanEnv, validators, str } = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  SENDGRID_API_KEY: nonemptystr({ desc: 'An API key for sending inquiry notifications via SendGrid.' }),
  SENDGRID_DEV_TO: str({ desc: 'An email address to send development submissions to.', default: '' }),
});
