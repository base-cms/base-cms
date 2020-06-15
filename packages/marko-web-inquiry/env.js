const { cleanEnv, validators, str } = require('@base-cms/env');

const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  // these are the google recaptcha test keys
  RECAPTCHA_SITE_KEY: str({ desc: 'An site key for sending recaptcha validation.', devDefault: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' }),
  RECAPTCHA_SECRET_KEY: str({ desc: 'A secret key for sending recaptcha validation.', devDefault: '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe' }),
  SENDGRID_API_KEY: nonemptystr({ desc: 'An API key for sending inquiry notifications via SendGrid.' }),
  SENDGRID_DEV_TO: str({ desc: 'An email address to send development submissions to.', default: '' }),
});
