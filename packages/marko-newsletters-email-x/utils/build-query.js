/**
 * Builds the EmailX ad unit query string.
 *
 * @param {object} params
 * @param {moment} params.momentDate The moment date of the deployment
 * @param {string} params.email The email address query var
 * @param {string} [param.send] The send corrlator var
 */
module.exports = ({ momentDate, email, send } = {}) => {
  const rand = Math.floor(Math.random() * 100000000);
  return {
    date: momentDate.format('YYYY-MM-DDTHH:mm:ssZ'),
    rand,
    email,
    send,
  };
};
