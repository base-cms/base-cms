/**
 * Builds the EmailX ad unit query string.
 *
 * @param {object} params
 * @param {moment} params.momentDate The moment date of the deployment
 * @param {string} params.email The email address query var
 * @param {string} [param.send] The send corrlator var
 * @param {bool}   [param.includeAdvertiser] Flag indicating if the advertiser data should be
 *                 returned in the response. Defaults to false.
 */
module.exports = ({
  momentDate,
  email,
  send,
  includeAdvertiser = false,
} = {}) => {
  const rand = Math.floor(Math.random() * 100000000);
  return {
    date: momentDate.format('YYYY-MM-DDTHH:mm:ssZ'),
    rand,
    email,
    send,
    ...(includeAdvertiser && { incAdv: true }),
  };
};
