/**
 * Generates an HTML email template thanking a user for their inquiry and
 * notifying them that it was received.
 *
 * @param template  The marko template to render
 * @param global    The marko globals to provide to the template
 * @param content   The platform.Content model to use in the template.
 * @param email     The email address this confirmation should be sent to
 * @param from      The address emails will be sent from.
 * @param bcc       The address(s) that will be blind copied on the email.
 * @returns Object  An object containing the rendered html, subject line, and addresses
 */
module.exports = ({
  template,
  $global,
  content,
  email,
  bcc,
  from,
}) => {
  const addresses = {
    to: email,
    from,
    bcc,
  };
  const subject = 'Your inquiry was received.';
  const input = {
    $global,
    content,
    subject,
    addresses,
  };
  const html = template.renderToString(input);
  return { html, subject, addresses };
};
