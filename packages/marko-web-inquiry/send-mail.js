const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY, SENDGRID_DEV_TO, isDev } = require('./env');

sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = ({ html, subject, addresses }) => {
  const { from } = addresses;
  if (!from) throw new Error('Cannot send mail without a from address!');
  const emails = isDev ? { to: SENDGRID_DEV_TO, from } : addresses;
  return sgMail.send({ html, subject, ...emails });
};
