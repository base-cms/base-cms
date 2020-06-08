const { asyncRoute } = require('@base-cms/utils');
const { getAsArray } = require('@base-cms/object-path');
const fetch = require('node-fetch');
const { content: contentLoader } = require('@base-cms/web-common/page-loaders');
const buildMarkoGlobal = require('@base-cms/marko-web/utils/build-marko-global');
const send = require('../send-mail');
const { notificationBuilder, confirmationBuilder } = require('../template-builders');
const storeInquiry = require('../utils/store-inquiry');
const { RECAPTCHA_SECRET_KEY } = require('../env');

module.exports = ({ queryFragment, notification, confirmation }) => asyncRoute(async (req, res) => {
  const { site } = res.app.locals;
  const {
    sendBcc: bcc,
    sendFrom: from,
    sendTo: to,
    directSend,
  } = site.getAsObject('inquiry');
  const $global = buildMarkoGlobal(res);
  const { apollo, body: payload } = req;
  const content = await contentLoader(apollo, { id: req.params.id, queryFragment });
  const emails = getAsArray(content, 'inquiryEmails');
  const addresses = {
    to: directSend && emails.length ? emails : to,
    cc: directSend && emails.length ? to : undefined,
    bcc,
    from,
  };

  const { error } = console;

  const exception = (message, code = 400) => {
    const err = new Error(message);
    err.statusCode = code;
    return err;
  };

  const validateRecaptcha = async ({ token: response }) => {
    const params = new URLSearchParams();
    params.append('response', response);
    params.append('secret', RECAPTCHA_SECRET_KEY);
    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'post', mode: 'no-cors', body: params });
    const json = await recaptchaRes.json();
    if (!json.success) {
      error('reCAPTCHA failed!', json, { secret: RECAPTCHA_SECRET_KEY, response });
      throw exception('Unable to validate your request because reCAPTCH failed!');
    }
    return true;
  };

  await Promise.all([
    // Store the submission
    storeInquiry({
      apollo,
      contentId: content.id,
      payload,
      addresses,
    }),
    validateRecaptcha(payload),
    // Notify the contacts of the submission
    send(notificationBuilder({
      template: notification,
      $global,
      content,
      payload,
      addresses,
    })),
    // Notify the user their submission was received
    req.body.confirmationEmail ? send(confirmationBuilder({
      template: confirmation,
      $global,
      content,
      email: req.body.confirmationEmail,
      from,
      bcc,
    })) : Promise.resolve(null),
  ]);
  res.json({ ok: true });
});
