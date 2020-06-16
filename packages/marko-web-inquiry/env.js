const { cleanEnv, validators, str } = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  // these are the google recaptcha test keys
  RECAPTCHA_SITE_KEY: nonemptystr({ desc: 'An site key for sending recaptcha validation.' }),
  RECAPTCHA_SECRET_KEY: nonemptystr({ desc: 'A secret key for sending recaptcha validation.' }),
  SENDGRID_API_KEY: nonemptystr({ desc: 'An API key for sending inquiry notifications via SendGrid.' }),
  SENDGRID_DEV_TO: str({ desc: 'An email address to send development submissions to.', default: '' }),
});
