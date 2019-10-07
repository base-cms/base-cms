const { assign } = Object;

/**
 * Generates the marko `$global` template property in the same way
 * as the Express middleware does.
 *
 * @param {object} res The Express response object.
 */
module.exports = (res) => {
  const { req, app } = res;
  return assign({ app, req, res }, app.locals, res.locals);
};
