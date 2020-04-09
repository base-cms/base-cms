const { isDev } = require('../env');

/**
 * Generates an HTML email template notifying contact(s) of a user's inquiry.
 *
 * @param template    The marko template to render
 * @param $global     The marko globals to provide to the template
 * @param content     The platform.Content model to use in the template.
 * @param payload     An object containing the user's submitted data.
 * @param to          The default addressee(s) emails will be sent to.
 * @param from        The address emails will be sent from.
 * @param bcc         The address(s) that will be blind copied on the email.
 * @param directSend  If the email should be sent to inquiry contacts
 * @returns Object    An object containing the rendered html, subject line, and addresses
 */
module.exports = ({
  template,
  $global,
  content,
  payload,
  addresses,
}) => {
  const subject = 'A new inquiry submission was received.';
  const input = {
    $global,
    content,
    subject,
    addresses,
    payload,
    isDev,
  };
  const html = template.renderToString(input);
  return { html, subject, addresses };
};
