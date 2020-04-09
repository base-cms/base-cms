const { cleanEnv, validators, str } = require('@base-cms/env');

const { nonemptystr } = validators;

// @todo This should be removed once inquiry is moved to core and the mailer service is created.
module.exports = cleanEnv(process.env, {
  SENDGRID_API_KEY: nonemptystr({ desc: 'An API key for sending email via SendGrid.' }),
  SENDGRID_DEV_TO: str({ desc: 'An email address to send development submissions to.', default: '' }),
});
